'use client';

import React from 'react';
import { PROJECTS } from '@/lib/constants';

export default function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-20 md:py-28">
      {/* Section Header */}
      <div className="mb-12 flex items-center gap-4">
        <span className="font-mono text-xs tabular-nums text-faint">02</span>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Projects
        </span>
        <span className="h-px flex-1 bg-line"></span>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {PROJECTS.map((project, index) => {
          const indexStr = `00${index + 1}`;

          return (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between overflow-hidden border border-line bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.7)]"
            >
              {/* Subtle hover gradient wash */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/[0.03] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <div>
                {/* Header with Index & Status */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-faint">{indexStr}</span>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-faint group-hover:bg-foreground transition-colors"></span>
                    </span>
                    {(project.status as string) === 'live' ? 'Live' : 'Completed'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-5 font-mono text-xl font-semibold text-foreground group-hover:text-white transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mt-3 font-mono text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-line/40">
                {/* Technologies */}
                <div className="flex flex-wrap items-center gap-1.5 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="border border-line/80 bg-background/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Project Link */}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-foreground transition-all duration-200 group-hover:translate-x-1"
                >
                  <span>View Project</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
