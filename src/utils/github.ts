export const dynamic = 'force-dynamic';

/**
 * GitHub API Integration Module
 * 
 * Handles communication with GitHub's API to fetch repository and user statistics.
 * Implements error handling and data transformation for the portfolio display.
 */

export interface GitHubUserData {
    public_repos: number;
    followers: number;
    created_at: string;
}

export interface GitHubRepo {
    name: string;
    language: string;
    updated_at: string;
}

export interface GitHubStats {
    userData: GitHubUserData;
    languages: { [key: string]: number };
    latestRepo?: {
        name: string;
        date: string;
        link: string;
    };
}

/**
 * Fetches GitHub stats from the Next.js server route /api/github-stats.
 */
export async function fetchGitHubStats(): Promise<GitHubStats | null> {
    try {
        const response = await fetch('/api/github-stats');
        if (!response.ok) throw new Error('Failed to fetch GitHub stats');
        return await response.json();
    } catch (error) {
        console.error('Client-side error fetching GitHub stats:', error);
        return null;
    }
}
