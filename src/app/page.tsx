import Navigation from '@/components/ui/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import TechStackSection from '@/components/sections/TechStackSection';
import ContactSection from '@/components/sections/ContactSection';
import GitHubTelemetryCard from '@/components/telemetry/GitHubTelemetryCard';
import LeetCodeTelemetryCard from '@/components/telemetry/LeetCodeTelemetryCard';

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* 01: Work Experience & Credentials */}
      <ExperienceSection />

      {/* 02: Featured Projects */}
      <ProjectsSection />

      {/* 03: Activity Matrix (GitHub & LeetCode) */}
      <section id="activity" className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-xs tabular-nums text-faint">03</span>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Activity Matrix
          </span>
          <span className="h-px flex-1 bg-line"></span>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <LeetCodeTelemetryCard />
          <GitHubTelemetryCard />
        </div>
      </section>

      {/* 04: Tech Stack */}
      <TechStackSection />

      {/* Contact & Minimal Footer */}
      <ContactSection />
    </main>
  );
}
