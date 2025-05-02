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

        const [userResponse, reposResponse] = await Promise.all([
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`, { headers })
        ]);

        const userData = await userResponse.json();
        const repos = await reposResponse.json();

        // Calculate languages
        const languages: { [key: string]: number } = {};
        repos
            .filter((repo: any) => !repo.fork && repo.language)
            .forEach((repo: any) => {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            });

        // Get latest repo
        const latestRepo = repos[0] ? {
            name: repos[0].name,
            date: repos[0].updated_at,
            link: repos[0].html_url
        } : null;

        const finalData = {
            userData,
            languages,
            latestRepo
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
