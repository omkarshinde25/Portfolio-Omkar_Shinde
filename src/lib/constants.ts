// Omkar Shinde - Portfolio Data Constants

export const PERSONAL_INFO = {
  name: 'Omkar Shinde',
  title: 'Data & AI Professional',
  location: 'Pune, India',
  email: 'shindeomkar2508@gmail.com',
  github: 'omkarshinde25',
  githubUrl: 'https://github.com/omkarshinde25',
  leetcode: 'omkarshinde25',
  leetcodeUrl: 'https://leetcode.com/u/omkarshinde25/',
  linkedin: 'https://www.linkedin.com/in/omkarshinde25/',
  twitterUrl: 'https://x.com/OmkarShind24640',
  xUrl: 'https://x.com/OmkarShind24640',
} as const;

export const EMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}&su=&body=`;

export const EXPERIENCE = [
  {
    id: 'fujitsu',
    company: 'Fujitsu',
    role: 'Data & AI Trainee',
    period: 'Mar 2026 — Present',
    location: 'Pune, India',
    description:
      'Worked as a Data & AI Trainee at Fujitsu, gaining hands-on experience in Python, SQL, Power BI, Qlik Sense, Generative AI, Retrieval-Augmented Generation (RAG), FastAPI, and enterprise AI solutions. Contributed to multiple analytics and AI projects while building expertise in machine learning, business intelligence, and data-driven decision-making.',
    technologies: ['Python', 'SQL', 'Power BI', 'Qlik Sense', 'FastAPI', 'GenAI'],
    status: 'active' as const,
  },
  {
    id: 'cravita',
    company: 'Cravita Technologies Pvt Ltd',
    role: 'Data Analyst Intern',
    period: 'Jul 2025 — Nov 2025',
    location: 'Pune, India',
    description:
      'Worked on data analysis and business intelligence projects using Python, SQL, Excel, and Power BI. Performed data cleaning, transformation, visualization, and reporting to support business insights and decision-making. Developed dashboards and analytical solutions to improve operational efficiency and reporting accuracy.',
    technologies: ['Python', 'SQL', 'Power BI', 'Tableau', 'Excel', 'Machine Learning', 'NLP', 'Gen AI'],
    status: 'completed' as const,
  },
  {
    id: 'igap',
    company: 'iGap Technologies Pvt Ltd',
    role: 'Python & Machine Learning Intern',
    period: 'Jun 2024 — Aug 2024',
    location: 'Kolhapur, India',
    description:
      'Developed machine learning models and data-driven applications using Python and Scikit-learn. Worked on data preprocessing, exploratory data analysis, model training, and performance evaluation while gaining practical experience in AI and machine learning workflows.',
    technologies: ['Python', 'Machine Learning', 'Scikit-learn', 'Pandas', 'NumPy'],
    status: 'completed' as const,
  },
] as const;

export const PROJECTS = [
  {
    id: 'uber-analysis',
    title: 'Uber Trip Data Analysis',
    description:
      'Analyzed 103,728 Uber trips using Python, SQL, Pandas, and Power BI. Built analytical workflows and dashboards to uncover ride patterns, operational trends, and business insights.',
    technologies: ['Python', 'Pandas', 'NumPy', 'SQL', 'Power BI'],
    githubUrl: 'https://github.com/omkarshinde25/uber-trip-analysis',
    status: 'completed' as const,
  },
  {
    id: 'movie-recommender',
    title: 'Movie Recommender System',
    description:
      'Content-based movie recommendation system using Python, ML, and NLP. Leverages TF-IDF and cosine similarity with a Streamlit UI and TMDB API integration.',
    technologies: [
      'Python',
      'Machine Learning',
      'NLP',
      'Scikit-learn',
      'Streamlit',
      'TMDB API',
    ],
    githubUrl: 'https://github.com/omkarshinde25/Movie_Recommender_System',
    status: 'completed' as const,
  },
] as const;

export const EDUCATION = [
  {
    degree: 'B.Tech in Information Technology',
    institution: 'Shivaji University',
    period: '2021 – 2025',
    grade: 'CGPA: 7.80 / 10.0',
    highlights: [
      'Data Structures & Algorithms',
      'Database Management',
      'Machine Learning',
      'Software Engineering',
    ],
  },
] as const;

export const CERTIFICATIONS = [
  {
    title: 'Fortune Cloud Technologies',
    issuer: 'Data Analytics and Data Science Certification',
    year: 'July 2025 – Feb 2026',
    skills: [
      'Python',
      'SQL',
      'Power BI',
      'Tableau',
      'Excel',
      'Machine Learning',
      'Gen AI',
      'Agentic AI',
    ],
  },
] as const;

export const TECH_STACK = {
  languagesLibraries: {
    title: 'Languages & Libraries',
    items: [
      'Python',
      'SQL',
      'Java',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
      'Scikit-learn',
      'NLTK',
    ],
  },
  dataEngineering: {
    title: 'Data Engineering',
    items: [
      'ETL / ELT',
      'Data Pipelines',
      'Data Cleaning & Transformation',
      'Data Modeling',
      'Data Warehousing',
      'Apache Spark',
      'Databricks',
    ],
  },
  databasesCloud: {
    title: 'Databases & Cloud',
    items: [
      'MySQL',
      'PostgreSQL',
      'SQLite',
      'AWS',
      'Amazon S3',
      'AWS Glue',
      'AWS Lambda',
      'Amazon Athena',
    ],
  },
  aiLlms: {
    title: 'AI & LLMs',
    items: [
      'Machine Learning',
      'Generative AI',
      'NLP',
      'LangChain',
      'Langflow',
      'RAG',
      'Hugging Face',
      'LLM Applications',
    ],
  },
  dataAnalyticsBi: {
    title: 'Data Analytics & BI',
    items: ['Power BI', 'Tableau', 'Excel', 'Qlik Sense'],
  },
  toolsPlatforms: {
    title: 'Tools & Platforms',
    items: ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook', 'PyCharm', 'SQL Workbench'],
  },
} as const;

// GitHub fallback data
export const GITHUB_FALLBACK = {
  username: 'omkarshinde25',
  totalRepos: 12,
  totalStars: 8,
  totalCommits: 247,
  currentStreak: 15,
  longestStreak: 42,
  totalContributions: 389,
  topLanguages: ['Python', 'SQL', 'DAX', 'Jupyter Notebook'],
  contributionData: [] as { date: string; count: number; level: number }[],
};

// LeetCode fallback data
export const LEETCODE_FALLBACK = {
  username: 'omkarshinde25',
  totalSolved: 127,
  easySolved: 52,
  mediumSolved: 58,
  hardSolved: 17,
  totalEasy: 850,
  totalMedium: 1780,
  totalHard: 760,
  acceptanceRate: 68.4,
  ranking: 285432,
  contributionPoints: 1847,
};

export const NAV_ITEMS = [
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'activity', label: 'Activity' },
  { id: 'stack', label: 'Stack' },
] as const;
