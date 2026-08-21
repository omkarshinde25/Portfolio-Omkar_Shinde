'use client';

import React from 'react';
import { TECH_STACK } from '@/lib/constants';

export default function TechStackSection() {
  const stackCategories = Object.entries(TECH_STACK).map(([key, val]) => ({
    id: key,
    title: val.title,
    items: val.items,
  }));

  // Flatten for the marquee ticker at the bottom
  const allSkills = [
    'PYTHON', 'SQL', 'JAVA', 'PANDAS', 'NUMPY', 'MATPLOTLIB', 'SEABORN',
    'SCIKIT-LEARN', 'NLTK', 'ETL / ELT', 'DATA PIPELINES', 'DATA MODELING',
    'DATA WAREHOUSING', 'APACHE SPARK', 'DATABRICKS', 'MYSQL', 'POSTGRESQL',
    'SQLITE', 'AWS', 'AMAZON S3', 'AWS GLUE', 'AWS LAMBDA', 'AMAZON ATHENA',
    'MACHINE LEARNING', 'GENERATIVE AI', 'NLP', 'LANGCHAIN', 'LANGFLOW', 'RAG',
    'HUGGING FACE', 'LLM APPLICATIONS', 'POWER BI', 'TABLEAU', 'EXCEL',
    'QLIK SENSE', 'GIT', 'GITHUB', 'VS CODE', 'JUPYTER NOTEBOOK',
    'PYCHARM', 'SQL WORKBENCH'
  ];

  return (
    <section id="stack" className="mx-auto max-w-5xl px-6 py-20 md:py-28">
      {/* Section Header */}
      <div className="mb-12 flex items-center gap-4">
        <span className="font-mono text-xs tabular-nums text-faint">04</span>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Technical Stack
        </span>
        <span className="h-px flex-1 bg-line"></span>
      </div>

      {/* 2-Column Grid of Categorized Boxes (matching screenshot 3) */}
      <div className="grid gap-6 sm:grid-cols-2">
        {stackCategories.map((category) => (
          <div
            key={category.id}
            className="group border border-line bg-card p-6 transition-all duration-300 hover:border-foreground/30 hover:bg-card-hover"
          >
            {/* Category Title */}
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground">
              {category.title}
            </h3>

            {/* Skills Pills / Rectangular Blocks */}
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="border border-line bg-background/60 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-all duration-200 hover:border-foreground/40 hover:text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Scrolling Marquee Ticker at the bottom (like screenshot 3 bottom bar) */}
      <div className="mt-14 overflow-hidden border-y border-line/60 py-3">
        <div className="flex w-max animate-marquee gap-8 font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
          {[...allSkills, ...allSkills].map((skill, idx) => (
            <span key={idx} className="flex items-center gap-8">
              <span>{skill}</span>
              <span className="h-1 w-1 rounded-full bg-line" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
