import { NextResponse } from 'next/server';
import { GITHUB_FALLBACK, PERSONAL_INFO } from '@/lib/constants';

let cache: { data: any; timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes for live auto-updating

export async function GET() {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  const username = PERSONAL_INFO.github || 'omkarshinde25';

  try {
    // 1. Fetch user profile
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: { 'User-Agent': 'omkarshinde25-portfolio' },
    });
    const userData = userRes.ok ? await userRes.json() : { public_repos: 29, followers: 16 };

    // 2. Fetch repos for stars and language statistics
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: { 'User-Agent': 'omkarshinde25-portfolio' },
    });
    const reposData = reposRes.ok ? await reposRes.json() : [];

    const totalStars = Array.isArray(reposData)
      ? reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0)
      : 28;

    const languages: Record<string, number> = {};
    if (Array.isArray(reposData)) {
      reposData.forEach((repo: any) => {
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
      });
    }

    const topLanguages = Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name]) => name);

    // 3. Fetch real contribution calendar
    let contributions: { date: string; count: number; level: number }[] = [];
    let totalContributions = 0;

    try {
      const contribRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
        headers: { 'User-Agent': 'omkarshinde25-portfolio' },
      });
      if (contribRes.ok) {
        const contribJson = await contribRes.json();
        contributions = contribJson.contributions || [];
        totalContributions = contribJson.total?.lastYear || contributions.reduce((a, b) => a + b.count, 0);
      }
    } catch {
      // fallback handled below
    }

    // Calculate streaks from real contributions
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    if (contributions.length > 0) {
      for (let i = 0; i < contributions.length; i++) {
        if (contributions[i].count > 0) {
          tempStreak++;
          if (tempStreak > longestStreak) longestStreak = tempStreak;
        } else {
          tempStreak = 0;
        }
      }

      // Current streak: count backwards from most recent day
      for (let i = contributions.length - 1; i >= 0; i--) {
        if (contributions[i].count > 0) {
          currentStreak++;
        } else {
          if (i === contributions.length - 1) continue;
          break;
        }
      }
    }

    const data = {
      username,
      publicRepos: userData.public_repos ?? 29,
      followers: userData.followers ?? 16,
      totalStars: totalStars || 28,
      topLanguages: topLanguages.length ? topLanguages : ['Python', 'SQL', 'Jupyter Notebook'],
      streak: {
        current: currentStreak || 15,
        longest: longestStreak || 42,
        total: totalContributions || 374,
      },
      contributions,
    };

    cache = {
      data,
      timestamp: Date.now(),
    };

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('GitHub API Error:', error);
    return NextResponse.json(GITHUB_FALLBACK, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
