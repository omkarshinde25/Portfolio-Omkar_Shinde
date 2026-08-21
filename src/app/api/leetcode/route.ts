import { NextResponse } from 'next/server';
import { LEETCODE_FALLBACK, PERSONAL_INFO } from '@/lib/constants';

let cache: { data: any; timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache for live auto-updating

export async function GET() {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  const username = PERSONAL_INFO.leetcode || 'omkarshinde25';

  // 1. Try direct LeetCode GraphQL API
  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
          }
          userCalendar {
            activeYears
            streak
            totalActiveDays
            submissionCalendar
          }
        }
      }
    `;

    const gqlRes = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (gqlRes.ok) {
      const gqlJson = await gqlRes.json();
      if (gqlJson.data?.matchedUser) {
        const mu = gqlJson.data.matchedUser;
        const stats = mu.submitStats?.acSubmissionNum || [];
        const getCount = (diff: string) => stats.find((s: any) => s.difficulty === diff)?.count || 0;

        let parsedCalendar: Record<string, number> = {};
        if (mu.userCalendar?.submissionCalendar) {
          try {
            parsedCalendar = typeof mu.userCalendar.submissionCalendar === 'string'
              ? JSON.parse(mu.userCalendar.submissionCalendar)
              : mu.userCalendar.submissionCalendar;
          } catch {
            parsedCalendar = {};
          }
        }

        const data = {
          username,
          totalSolved: getCount('All'),
          easySolved: getCount('Easy'),
          mediumSolved: getCount('Medium'),
          hardSolved: getCount('Hard'),
          ranking: mu.profile?.ranking || 1511362,
          streak: mu.userCalendar?.streak || 0,
          totalActiveDays: mu.userCalendar?.totalActiveDays || 0,
          submissionCalendar: parsedCalendar,
        };

        cache = { data, timestamp: Date.now() };
        return NextResponse.json(data, {
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }
  } catch {
    // proceed to fallback
  }

  // 2. Fallback to Alfa LeetCode API
  try {
    const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`, {
      headers: { 'User-Agent': 'omkarshinde25-portfolio' },
    });

    if (res.ok) {
      const json = await res.json();
      if (json && !json.errors) {
        let parsedCalendar: Record<string, number> = {};
        if (json.submissionCalendar) {
          try {
            parsedCalendar = typeof json.submissionCalendar === 'string'
              ? JSON.parse(json.submissionCalendar)
              : json.submissionCalendar;
          } catch {
            parsedCalendar = {};
          }
        }

        const data = {
          username,
          totalSolved: json.totalSolved ?? 110,
          easySolved: json.easySolved ?? 72,
          mediumSolved: json.mediumSolved ?? 33,
          hardSolved: json.hardSolved ?? 5,
          totalEasy: json.totalEasy ?? 960,
          totalMedium: json.totalMedium ?? 2103,
          totalHard: json.totalHard ?? 966,
          ranking: json.ranking ?? 1511362,
          streak: 39,
          submissionCalendar: parsedCalendar,
        };

        cache = { data, timestamp: Date.now() };
        return NextResponse.json(data, {
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }
  } catch (error) {
    console.error('LeetCode API Error:', error);
  }

  return NextResponse.json(LEETCODE_FALLBACK, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}
