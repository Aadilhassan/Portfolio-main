export const profile = {
  name: "Aadil Hassan",
  title: "Senior Software Engineer",
  location: "Ranchi, India",
  availability: "Remote · overlaps US Eastern",
  email: "aahanalhassan@gmail.com",
  github: "https://github.com/aadilhassan",
  linkedin: "https://www.linkedin.com/in/aadil--hassan",
  resume:
    "https://drive.google.com/file/d/1f6X28cXCtzI1DZs_dFuIU6NU692T4-ff/view?usp=sharing",
  tagline:
    "I build AI-native products end to end — LLM pipelines, voice agents, and full-stack SaaS. Three years in, 10+ shipped, several live with paying users.",
};

export const stats = [
  { value: "3+", label: "Years shipping production software" },
  { value: "10+", label: "Products built end to end" },
  { value: "170", label: "Active users on live SaaS" },
  { value: "99.9%", label: "Uptime on AI services in prod" },
];

export const about = [
  "I'm a full-stack engineer who owns the whole thing — architecture, LLM orchestration, evaluation loops, telemetry, and the cost-and-latency tradeoffs that keep AI reliable once real users show up. Most of what I've built, I've built solo, top to bottom.",
  "I've worked across medical data, dealership finance, marketing, and developer tooling. I care about correctness — I've paired LLMs with deterministic math engines when the numbers had to be exactly right — and about catching failures before users do, with real test coverage instead of hope.",
];

export interface Project {
  name: string;
  kind: string;
  year?: string;
  description: string;
  stack: string[];
  links?: { label: string; href: string }[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    name: "Dealer's Dash",
    kind: "AI revenue optimization for auto dealerships",
    featured: true,
    description:
      "Heavy financial-data platform on AWS. Parses raw and scanned dealership financial statements, pairs a fine-tuned LLM with a deterministic math engine so numbers are always exact, and lets non-technical stakeholders query in plain English. ~90% plan-to-action time reduction.",
    stack: ["AWS", "Python", "LLM fine-tuning", "LlamaParse", "NL query"],
  },
  {
    name: "Infollion",
    kind: "Medical-data platform",
    description:
      "Data-heavy expert-sourcing system for a B2B expert network. Built scraping and enrichment pipelines that pull and structure large volumes of medical-practitioner data, surfaced through interactive dashboards for client due-diligence.",
    stack: ["Scraping / ETL", "Dashboards", "Data viz", "Full-stack"],
    links: [{ label: "infollion.com", href: "https://www.infollion.com" }],
  },
  {
    name: "MarketifyALL",
    kind: "Multi-tenant marketing SaaS · 170 active users",
    featured: true,
    description:
      "AI content, social publishing, email, SEO, landing pages, and lead CRM — driven by an AI chat command-center, with per-workspace LLM cost metering and Stripe billing. Grew from empty repo to 170 active users.",
    stack: ["Next.js", "Supabase (RLS/RBAC)", "OpenAI / Claude", "Vercel"],
    links: [{ label: "marketifyall.com", href: "https://marketifyall.com" }],
  },
  {
    name: "Marketify Design Editor",
    kind: "Open-source Canva alternative",
    description:
      "Free, open-source design tool with full canvas engine, 1000+ fonts, stock photos, templates, watermark-free export, plus GPT-4 and Claude for AI-assisted design. Core editor kit published on npm.",
    stack: ["React", "TypeScript", "FabricJS", "Supabase"],
    links: [
      { label: "design.marketifyall.com", href: "https://design.marketifyall.com" },
      {
        label: "npm: design-editor-kit",
        href: "https://www.npmjs.com/package/@marketifyall/design-editor-kit",
      },
      { label: "GitHub", href: "https://github.com/Aadilhassan/Marketifyall-design-Editor" },
    ],
  },
  {
    name: "email-probe",
    kind: "Published npm SDK · zero runtime deps",
    featured: true,
    description:
      "7-layer email-deliverability pipeline — syntax, DNS/MX, disposable, role, typo-correction, catch-all, and live SMTP checks — with batch and queue distribution. Cut marketing-email bounce rate by ~95%. Full unit-test coverage on every layer.",
    stack: ["TypeScript", "Vitest", "RabbitMQ", "npm"],
    links: [{ label: "GitHub", href: "https://github.com/aadilhassan" }],
  },
  {
    name: "RankOps",
    kind: "Autonomous SEO agent",
    description:
      "Connects Google Search Console to Webflow CMS: finds underperforming pages, rewrites metadata with Claude + LangGraph, deploys the change, A/B tests it, and auto-reverts if CTR doesn't improve. An agent that governs its own output.",
    stack: ["Claude", "LangGraph", "Trigger.dev", "OpenTelemetry"],
  },
  {
    name: "RealStateVideo",
    kind: "Live SaaS · Stripe billing",
    description:
      "Turns property listings into platform-optimized marketing videos: vision + script generation, viral-hook scoring, TTS, word-level caption alignment, automated FFmpeg rendering, and quality-eval that gates bad renders before delivery.",
    stack: ["Astro / React", "Supabase", "Trigger.dev", "FFmpeg"],
    links: [{ label: "realstatevideo.com", href: "https://realstatevideo.com" }],
  },
  {
    name: "AI Voice Call Center",
    kind: "Autonomous phone agents",
    description:
      "Real-time voice over Twilio Media Streams — Deepgram STT, ElevenLabs TTS, Groq-served LLMs — with barge-in for sub-second turns, Qdrant RAG knowledge bases, post-call LLM scoring as an eval loop, and a one-line embeddable widget.",
    stack: ["Next.js", "PostgreSQL", "Redis", "Twilio"],
  },
];

export const alsoBuilt =
  "penpot-mcp (MCP server for LLM-driven design edits) · Cortex (RAG voice tutor, Dockerized) · a multimodal vision → Qdrant RAG pipeline · an MCP-backed personal-finance dashboard.";

export interface Job {
  company: string;
  role: string;
  location: string;
  period: string;
  points: string[];
}

export const experience: Job[] = [
  {
    company: "Tech Ventures Group",
    role: "Senior Software Engineer",
    location: "Remote",
    period: "Jun 2024 — Present",
    points: [
      "Ship full-stack features across a Next.js/React frontend and a Python backend, owning them end to end from scope to architecture to deploy to monitoring.",
      "Architected an AI email/newsletter builder with an embedded Claude-powered chat copilot that drafts and edits campaign content from natural-language prompts.",
      "Built automated pytest and evaluation coverage for data-heavy Python/Pandas workflows, sustaining 99.9% reliability for AI-backed services.",
    ],
  },
  {
    company: "CribStore Innovations",
    role: "Lead Software Engineer",
    location: "Hyderabad, India",
    period: "Nov 2023 — Aug 2024",
    points: [
      "Led full-stack design of MERN microservices for a real-estate platform with RabbitMQ async messaging and Redis caching.",
      "Built email-probe, a 7-layer email-verification SDK that cut bounce rate by ~95%.",
    ],
  },
  {
    company: "Blackcoffer",
    role: "Software Engineer",
    location: "Remote",
    period: "Jan 2023 — Nov 2023",
    points: [
      "Built Toowe.io, a social-media automation platform for concurrent publishing across Facebook, Instagram and X.",
      "Containerized services with Docker + Nginx for consistent deployments.",
    ],
  },
];

export interface SkillGroup {
  label: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    label: "QA & Testing",
    items: ["Playwright", "Cypress", "pytest", "Vitest / Jest", "CI test gates", "LLM evals"],
  },
  { label: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL", "Go"] },
  {
    label: "Frontend",
    items: ["React", "Next.js", "React Native", "Astro", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["FastAPI", "Node.js", "Express", "REST & GraphQL", "Django"],
  },
  {
    label: "AI / LLM",
    items: [
      "Claude API",
      "OpenAI API",
      "LangGraph",
      "RAG (Qdrant)",
      "LLM fine-tuning",
      "Voice AI",
      "MCP",
    ],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "Supabase", "MongoDB", "Redis", "Prisma / Drizzle", "ETL"],
  },
  {
    label: "Cloud & DevOps",
    items: ["AWS", "Vercel", "Cloudflare", "Docker", "CI/CD"],
  },
];

export const education = [
  {
    school: "BITS Pilani",
    detail: "B.Tech (WILP), Artificial Intelligence & Machine Learning",
  },
  {
    school: "Jharkhand University of Technology",
    detail: "Diploma, Computer Science & Engineering",
  },
];
