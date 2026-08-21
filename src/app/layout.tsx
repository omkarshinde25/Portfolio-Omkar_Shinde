import type { Metadata } from 'next';
import './globals.css';
import CustomCursor from '@/components/ui/CustomCursor';
import ThemeProvider from '@/components/ui/ThemeProvider';

export const metadata: Metadata = {
  title: 'Omkar Shinde — Data & AI Professional',
  description:
    'Data & AI Professional building scalable data analytics solutions, machine learning systems, business intelligence dashboards, and AI-powered applications.',
  keywords: [
    'Omkar Shinde',
    'Data Analyst',
    'Data Scientist',
    'AI Engineer',
    'Machine Learning',
    'Power BI',
    'Python',
    'Fujitsu',
  ],
  authors: [{ name: 'Omkar Shinde' }],
  openGraph: {
    title: 'Omkar Shinde — Data & AI Professional',
    description:
      'Building scalable data analytics solutions, machine learning systems, business intelligence dashboards, and AI-powered applications.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="font-mono antialiased grain min-h-screen bg-background text-foreground selection:bg-[var(--selection-bg)] selection:text-[var(--selection-color)]">
        <ThemeProvider>
          <CustomCursor />
          <div className="bg-grid pointer-events-none fixed inset-0 z-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
          <div className="relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
