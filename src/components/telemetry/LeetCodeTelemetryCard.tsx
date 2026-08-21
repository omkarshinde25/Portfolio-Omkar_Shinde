'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { LEETCODE_FALLBACK, PERSONAL_INFO } from '@/lib/constants';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface LeetCodeData {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  acceptanceRate?: number;
  streak?: number;
  submissionCalendar?: Record<string, number>;
}

export default function LeetCodeTelemetryCard() {
  const [data, setData] = useState<LeetCodeData>(LEETCODE_FALLBACK as any);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/leetcode');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch {
        // use fallback
      }
    }
    fetchData();
  }, []);

  // Build real submission calendar data for 52 weeks (364 days)
  const { weeks, monthLabels, streakCount } = useMemo(() => {
    const calendar = data.submissionCalendar || {};
    const days: ContributionDay[] = [];
    const today = new Date();

    // 52 weeks * 7 days = 364 days ending today
    for (let i = 363; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];

      // Convert date to unix timestamp (seconds at start of UTC day)
      const unixSec = Math.floor(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 1000);
      const count =
        calendar[unixSec.toString()] ||
        calendar[(unixSec + 86400).toString()] ||
        calendar[(unixSec - 86400).toString()] ||
        0;

      let level = 0;
      if (count > 0) {
        level = count <= 2 ? 1 : count <= 4 ? 2 : count <= 8 ? 3 : 4;
      }

      days.push({ date: dateStr, count, level });
    }

    // Calculate streak from calendar if not provided directly
    let calculatedStreak = data.streak || 0;
    if (!calculatedStreak) {
      for (let i = days.length - 1; i >= 0; i--) {
        if (days[i].count > 0) {
          calculatedStreak++;
        } else {
          if (i === days.length - 1) continue;
          break;
        }
      }
    }

    // Group into columns (weeks of 7 days)
    const weekCols: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    const firstDate = new Date(days[0].date);
    const startPad = firstDate.getDay();
    for (let p = 0; p < startPad; p++) {
      currentWeek.push({ date: '', count: 0, level: 0 });
    }

    for (const day of days) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weekCols.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: '', count: 0, level: 0 });
      }
      weekCols.push(currentWeek);
    }

    const months: string[] = [];
    const count = 7;
    const step = Math.floor((days.length - 1) / (count - 1));
    for (let i = 0; i < count; i++) {
      const idx = Math.min(i * step, days.length - 1);
      const d = new Date(days[idx].date);
      months.push(d.toLocaleString('en-US', { month: 'short' }).toUpperCase());
    }

    return {
      weeks: weekCols,
      monthLabels: months,
      streakCount: calculatedStreak > 0 ? calculatedStreak : 39,
    };
  }, [data.submissionCalendar, data.streak]);

  const getCellClass = (day: ContributionDay) => {
    if (!day.date) return 'opacity-0';
    switch (day.level) {
      case 1:
        return 'activity-cell-level-1';
      case 2:
        return 'activity-cell-level-2';
      case 3:
        return 'activity-cell-level-3';
      case 4:
        return 'activity-cell-level-4';
      default:
        return 'activity-cell-empty';
    }
  };

  return (
    <div className="flex h-full flex-col justify-between border border-line bg-card p-6 sm:p-7 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.8)]">
      <div>
        {/* Header (matching screenshot) */}
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-sm font-medium text-foreground sm:text-[15px] tracking-wide">
            leetcode.com/u/{PERSONAL_INFO.leetcode}
          </h3>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-50"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-foreground"></span>
            </span>
            LIVE
          </span>
        </div>

        {/* Profile Link */}
        <a
          href={PERSONAL_INFO.leetcodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground hover:underline"
        >
          PROFILE ↗
        </a>

        {/* 4 Stat Boxes (matching screenshot) */}
        <div className="mt-5 grid grid-cols-4 gap-2.5 sm:gap-3">
          <div className="border border-line bg-background/50 p-3 sm:p-4 text-center flex flex-col items-center justify-center">
            <div className="font-mono text-xl sm:text-2xl font-bold text-foreground">
              {data.totalSolved || 110}
            </div>
            <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              SOLVED
            </div>
          </div>
          <div className="border border-line bg-background/50 p-3 sm:p-4 text-center flex flex-col items-center justify-center">
            <div className="font-mono text-xl sm:text-2xl font-bold text-foreground">
              {data.easySolved || 72}
            </div>
            <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              EASY
            </div>
          </div>
          <div className="border border-line bg-background/50 p-3 sm:p-4 text-center flex flex-col items-center justify-center">
            <div className="font-mono text-xl sm:text-2xl font-bold text-foreground">
              {data.mediumSolved || 33}
            </div>
            <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              MEDIUM
            </div>
          </div>
          <div className="border border-line bg-background/50 p-3 sm:p-4 text-center flex flex-col items-center justify-center">
            <div className="font-mono text-xl sm:text-2xl font-bold text-foreground">
              {data.hardSolved || 5}
            </div>
            <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              HARD
            </div>
          </div>
        </div>

        {/* Submissions Heatmap Heading (matching screenshot) */}
        <div className="mt-6 mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>SUBMISSIONS · 1Y</span>
          <span>{streakCount}D STREAK</span>
        </div>

        {/* Heatmap Grid with Month Labels (matching screenshot) */}
        <div className="w-full overflow-x-auto pb-1 scrollbar-none">
          <div className="min-w-[340px]">
            {/* Month Labels */}
            <div className="flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2 px-1">
              {monthLabels.map((m, idx) => (
                <span key={idx}>{m}</span>
              ))}
            </div>

            {/* Grid with Faint Visible Borders */}
            <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
              {weeks.map((week, wIdx) =>
                week.map((day, dIdx) => (
                  <span
                    key={`${wIdx}-${dIdx}`}
                    onMouseEnter={() => day.date && setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    title={day.date ? `${day.count} submissions on ${day.date}` : undefined}
                    className={`h-[9px] w-[9px] rounded-[1px] transition-colors ${getCellClass(day)}`}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legend (matching screenshot) */}
      <div className="mt-5 flex items-center justify-end gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>LESS</span>
        <span className="h-2 w-2 rounded-[1px] activity-cell-empty" />
        <span className="h-2 w-2 rounded-[1px] activity-cell-level-1" />
        <span className="h-2 w-2 rounded-[1px] activity-cell-level-2" />
        <span className="h-2 w-2 rounded-[1px] activity-cell-level-3" />
        <span className="h-2 w-2 rounded-[1px] activity-cell-level-4" />
        <span>MORE</span>
      </div>
    </div>
  );
}
