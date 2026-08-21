'use client';

import React from 'react';
import { PERSONAL_INFO, EMAIL_COMPOSE_URL } from '@/lib/constants';

export default function HeroSection() {
  const SOCIAL_LINKS = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/omkarshinde25/' },
    { name: 'GitHub', url: 'https://github.com/omkarshinde25' },
    { name: 'X (Twitter)', url: 'https://x.com/OmkarShind24640' },
    { name: 'Email', url: EMAIL_COMPOSE_URL },
  ];

  return (
    <section id="top" className="relative flex min-h-[92vh] items-center overflow-hidden pt-24 pb-16">
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <div className="max-w-3xl">
          {/* Subtitle / Location */}
          <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span className="h-px w-8 bg-faint"></span>
            <span>Data & AI Professional · Pune, India</span>
          </div>

          {/* Large Display Name */}
          <h1 className="font-mono text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-foreground sm:text-6xl md:text-7xl">
            Omkar
            <br />
            <span className="text-muted-foreground">Shinde</span>
          </h1>

          {/* Terminal prompt vibe line */}
          <p className="mt-6 flex flex-wrap items-baseline gap-x-2 font-mono text-sm text-muted-foreground sm:text-base">
            <span className="text-faint">$</span>
            <span>building data &amp; AI solutions</span>
            <span className="caret-blink inline-block h-4 w-2 translate-y-0.5 bg-foreground align-middle" />
          </p>

          {/* Main Description */}
          <p className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            Building data pipelines and data platforms that work reliably in production — not just in a demo. Python, SQL, ETL, and cloud technologies for turning raw data into reliable, business-ready insights.
          </p>

          {/* Current Role */}
          <div className="mt-6 flex items-center gap-2.5 font-mono text-xs text-foreground/90">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-40"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground"></span>
            </span>
            <span className="tracking-wide">Data &amp; AI Trainee @ Fujitsu</span>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden border border-foreground bg-foreground px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-background transition-all duration-200 hover:bg-transparent hover:text-foreground"
            >
              Get in touch
              <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>

            <a
              href="#projects"
              className="group inline-flex items-center gap-2 border border-line px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-foreground transition-all duration-200 hover:border-foreground hover:bg-card"
            >
              View Projects
              <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          </div>

          {/* Minimalist Inline Social Links */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs text-muted-foreground">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <span>{link.name}</span>
                <span className="text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-2 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-faint md:flex">
        <span>Scroll</span>
        <span className="h-8 w-px animate-pulse bg-line" />
      </div>
    </section>
  );
}
