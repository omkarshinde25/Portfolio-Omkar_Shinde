'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { GITHUB_FALLBACK, PERSONAL_INFO } from '@/lib/constants';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface GitHubData {
  publicRepos: number;
  followers: number;
  totalStars: number;
  topLanguages: string[];
  streak?: {
    current: number;
    longest: number;
    total: number;
  };
  contributions?: ContributionDay[];
}

export default function GitHubTelemetryCard() {
  const [data, setData] = useState<GitHubData>(GITHUB_FALLBACK as any);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/github');
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

  const contributions = useMemo(() => {
    if (data.contributions && data.contributions.length > 0) {
      return data.contributions;
    }
    const fallbackDays: ContributionDay[] = [];
    const today = new Date();
    for (let i = 363; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      fallbackDays.push({
        date: d.toISOString().split('T')[0],
        count: 0,
        level: 0,
      });
    }
    return fallbackDays;
  }, [data.contributions]);

  // Group into weeks (columns)
  const weeks = useMemo(() => {
    if (contributions.length === 0) return [];
    const result: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    const firstDate = new Date(contributions[0].date);
    const startPad = firstDate.getDay();

    for (let i = 0; i < startPad; i++) {
      currentWeek.push({ date: '', count: 0, level: 0 });
    }

    for (const day of contributions) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        result.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: '', count: 0, level: 0 });
      }
      result.push(currentWeek);
    }

    return result;
  }, [contributions]);

  // Dynamic month labels matching heatmap timeline
  const monthLabels = useMemo(() => {
    if (!contributions || contributions.length === 0) {
      const months: string[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        months.push(d.toLocaleString('en-US', { month: 'short' }).toUpperCase());
      }
      return months;
    }
    const labels: string[] = [];
    const count = 7;
    const step = Math.floor((contributions.length - 1) / (count - 1));
    for (let i = 0; i < count; i++) {
      const idx = Math.min(i * step, contributions.length - 1);
      const d = new Date(contributions[idx].date);
      labels.push(d.toLocaleString('en-US', { month: 'short' }).toUpperCase());
    }
    return labels;
  }, [contributions]);

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
            github.com/{PERSONAL_INFO.github}
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
          href={PERSONAL_INFO.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground hover:underline"
        >
          @{PERSONAL_INFO.github.toUpperCase()} ↗
        </a>

        {/* 4 Stat Boxes (matching screenshot) */}
        <div className="mt-5 grid grid-cols-4 gap-2.5 sm:gap-3">
          <div className="border border-line bg-background/50 p-3 sm:p-4 text-center flex flex-col items-center justify-center">
            <div className="font-mono text-xl sm:text-2xl font-bold text-foreground">
              {data.streak?.total ?? 374}
            </div>
            <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              CONTRIBS
            </div>
          </div>
          <div className="border border-line bg-background/50 p-3 sm:p-4 text-center flex flex-col items-center justify-center">
            <div className="font-mono text-xl sm:text-2xl font-bold text-foreground">
              {data.publicRepos ?? 29}
            </div>
            <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              REPOS
            </div>
          </div>
          <div className="border border-line bg-background/50 p-3 sm:p-4 text-center flex flex-col items-center justify-center">
            <div className="font-mono text-xl sm:text-2xl font-bold text-foreground">
              {data.totalStars ?? 28}
            </div>
            <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              STARS
            </div>
          </div>
          <div className="border border-line bg-background/50 p-3 sm:p-4 text-center flex flex-col items-center justify-center">
            <div className="font-mono text-xl sm:text-2xl font-bold text-foreground">
              {data.followers ?? 16}
            </div>
            <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              FOLLOWERS
            </div>
          </div>
        </div>

        {/* Contributions Heatmap Heading (matching screenshot) */}
        <div className="mt-6 mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>CONTRIBUTIONS · 1Y</span>
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
                    title={day.date ? `${day.count} contributions on ${day.date}` : undefined}
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
