'use client';

import React from 'react';
import { EXPERIENCE, EDUCATION, CERTIFICATIONS } from '@/lib/constants';

export default function ExperienceSection() {
  return (
    <section id="work" className="mx-auto max-w-5xl px-6 py-20 md:py-28">
      {/* Section Header */}
      <div className="mb-12 flex items-center gap-4">
        <span className="font-mono text-xs tabular-nums text-faint">01</span>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Work History
        </span>
        <span className="h-px flex-1 bg-line"></span>
      </div>

      {/* Experience Timeline */}
      <div className="border-l border-line">
        {EXPERIENCE.map((exp) => {
          return (
            <div key={exp.id} className="group relative pb-12 pl-6 last:pb-0 sm:pl-10">
              {/* Timeline marker */}
              <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 border border-line bg-background transition-all duration-300 group-hover:border-foreground group-hover:bg-foreground" />
              <span className="pointer-events-none absolute -left-px top-4 h-0 w-px bg-foreground/40 transition-all duration-500 group-hover:h-full" />

              {/* Role & Period */}
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-mono text-base font-semibold text-foreground sm:text-lg">
                  {exp.role} <span className="font-normal text-muted-foreground">@ {exp.company}</span>
                </h3>
                <span className="font-mono text-[11px] uppercase tracking-widest text-faint">
                  {exp.period}
                </span>
              </div>

              {/* Location */}
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                <span>{exp.location}</span>
              </p>

              {/* Paragraph Description */}
              <p className="mt-3 max-w-3xl font-mono text-sm leading-relaxed text-muted-foreground">
                {exp.description}
              </p>

              {/* Skills Pills */}
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors group-hover:border-foreground/30 group-hover:text-foreground/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Education & Certifications Subsection */}
      <div className="mt-20 pt-12 border-t border-line/60">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Education */}
          <div className="flex flex-col">
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Education
            </h4>
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="flex flex-1 flex-col border border-line bg-card p-5">
                <div className="flex items-baseline justify-between gap-2">
                  <h5 className="font-mono text-sm font-semibold text-foreground">{edu.degree}</h5>
                  <span className="font-mono text-[11px] text-faint">{edu.period}</span>
                </div>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{edu.institution}</p>
                <p className="mt-2 font-mono text-xs text-foreground/90 font-medium">{edu.grade}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {edu.highlights.map((h, i) => (
                    <span key={i} className="border border-line/60 bg-background/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="flex flex-col">
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Certifications
            </h4>
            <div className="flex flex-1 flex-col">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="flex flex-1 flex-col border border-line bg-card p-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h5 className="font-mono text-sm font-semibold text-foreground">{cert.title}</h5>
                    <span className="font-mono text-[11px] text-faint">{cert.year}</span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">{cert.issuer}</p>
                  {'skills' in cert && (cert as any).skills && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {(cert as any).skills.map((skill: string, i: number) => (
                        <span
                          key={i}
                          className="border border-line/60 bg-background/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
