'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, PERSONAL_INFO, EMAIL_COMPOSE_URL } from '@/lib/constants';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      setMobileMenuOpen(false);
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-line bg-background/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Brand / Logo */}
        <a
          href="#top"
          onClick={(e) => scrollToSection(e, '#top')}
          className="group flex items-center gap-2.5"
        >
          <span className="flex h-7 w-7 items-center justify-center border border-line font-mono text-[11px] font-semibold text-foreground transition-all duration-200 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
            OS
          </span>
          <span className="font-mono text-xs tracking-widest text-muted-foreground transition-colors group-hover:text-foreground">
            OMKAR.SHINDE
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, `#${item.id}`)}
              className="group relative font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right CTA / Contact, Theme Toggle & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <a
            href={EMAIL_COMPOSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-2 border border-line px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-foreground transition-all duration-200 hover:border-foreground hover:bg-foreground hover:text-background sm:flex"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current"></span>
            </span>
            Contact
          </a>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center border border-line text-foreground transition-colors hover:border-foreground md:hidden"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`overflow-hidden border-b border-line bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden ${
          mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, `#${item.id}`)}
              className="border-b border-line/50 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href={EMAIL_COMPOSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center gap-2 py-2 font-mono text-xs uppercase tracking-widest text-foreground"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current"></span>
            </span>
            Get in touch ↗
          </a>
        </div>
      </div>
    </header>
  );
}
