export const dynamic = 'force-dynamic'

/**
 * GitHub Statistics API Route
 * 
 * Fetches GitHub data server-side and handles rate limiting.
 * 
 * @route GET /api/github-stats
 */

import { NextApiRequest, NextApiResponse } from 'next';
import redisClient from "@/lib/redis";

const GITHUB_USERNAME = 'Jacob-Walton';
const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
const REDIS_CACHE = "github:stats";

if (!GITHUB_TOKEN) {
    console.warn('GITHUB_ACCESS_TOKEN is not set. API rate limiting may occur.');
}

/**
 * API Route Handler
 * 
 * @param {NextApiRequest} req - Next.js API request object
 * @param {NextApiResponse} res - Next.js API response object
 * @returns {Promise<void>}
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const headers = {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
        };

        const redisCacheData = await redisClient.get(REDIS_CACHE);
        if (redisCacheData != null) {
            const data = JSON.parse(redisCacheData);
            res.setHeader('Cache-Control', 's-maxage=0');
            return res.status(200).json(data);
        }

        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers });
        const userData = await userResponse.json();

        // Fetch ALL repositories with pagination
        let allRepos: any[] = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
            const reposResponse = await fetch(
                `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=updated`, 
                { headers }
            );
            const repos = await reposResponse.json();
            
            if (repos.length === 0) {
                hasMore = false;
            } else {
                allRepos = allRepos.concat(repos);
                page++;
            }
        }

        // Calculate languages from ALL repositories by fetching language stats
        const languages: { [key: string]: number } = {};
        
        // Filter out forks and repos without languages endpoint
        const validRepos = allRepos.filter((repo: any) => !repo.fork);
        
        // Fetch language data for each repository
        for (const repo of validRepos) {
            try {
                const langResponse = await fetch(
                    `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/languages`,
                    { headers }
                );
                
                if (langResponse.ok) {
                    const repoLanguages = await langResponse.json();
                    
                    // Add bytes of code for each language
                    for (const [language, bytes] of Object.entries(repoLanguages)) {
                        languages[language] = (languages[language] || 0) + (bytes as number);
                    }
                }
            } catch (error) {
                console.warn(`Failed to fetch languages for repo ${repo.name}:`, error);
            }
        }

        // Get latest repo (first one since they're sorted by updated_at)
        const latestRepoData = allRepos[0];
        const latestRepo = latestRepoData ? {
            name: latestRepoData.name,
            date: latestRepoData.updated_at,
            link: latestRepoData.html_url,
            language: latestRepoData.language
        } : null;

        // Calculate most used language by bytes of code
        let mostFrequentLanguage: string | null = null;
        let maxBytes = 0;
        if (Object.keys(languages).length > 0) {
            for (const lang in languages) {
                if (languages[lang] > maxBytes) {
                    maxBytes = languages[lang];
                    mostFrequentLanguage = lang;
                }
            }
        }

        const finalData = {
            userData,
            languages,
            latestRepo,
            mostFrequentLanguage
        };

        await redisClient.set(REDIS_CACHE, JSON.stringify(finalData), 'EX', (10 * 60));

        res.setHeader('Cache-Control', 's-maxage=0'); // Don't cache
        res.status(200).json(finalData);
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        res.status(500).json({ 
            error: 'Failed to fetch GitHub stats',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}