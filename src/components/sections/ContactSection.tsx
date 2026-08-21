'use client';

import React, { useState } from 'react';
import { PERSONAL_INFO, EMAIL_COMPOSE_URL } from '@/lib/constants';
import { Copy, Check } from 'lucide-react';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const links = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/omkarshinde25/' },
    { name: 'GitHub', url: 'https://github.com/omkarshinde25' },
    { name: 'X (Twitter)', url: 'https://x.com/OmkarShind24640' },
    { name: 'Email', url: EMAIL_COMPOSE_URL },
  ];

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 pt-24 pb-16">
      {/* Small top header label (like screenshot 1) */}
      <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        Let&apos;s Build Something Together
      </div>

      {/* Main Email Display & Social Links (like screenshot 1) */}
      <div className="flex flex-col justify-between gap-8 pb-12 sm:flex-row sm:items-end">
        {/* Large Email Heading */}
        <div className="group flex flex-wrap items-center gap-3">
          <a
            href={EMAIL_COMPOSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-2xl font-semibold tracking-tight text-foreground transition-colors hover:text-foreground/80 sm:text-3xl md:text-4xl"
          >
            {PERSONAL_INFO.email}
          </a>
          <button
            onClick={copyEmail}
            title="Copy email address"
            className="inline-flex h-8 w-8 items-center justify-center border border-line bg-card text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-foreground" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* Social Links on the right */}
        <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-muted-foreground">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
            >
              <span>{link.name}</span>
              <span className="text-[10px]">↗</span>
            </a>
          ))}
        </div>
      </div>

      {/* Thin Horizontal Rule */}
      <div className="border-t border-line/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-faint">
        <div>© {new Date().getFullYear()} OMKAR SHINDE</div>
        <div>DATA &amp; AI PROFESSIONAL</div>
      </div>
    </section>
  );
}
