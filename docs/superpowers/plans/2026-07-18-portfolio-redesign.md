# Portfolio Redesign — Multi-Page Editorial

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio from a single-page neo-brutalist site into a multi-page editorial portfolio with project case studies, writing section, and AIO/GEO/SEO optimization.

**Architecture:** Astro 5 static site with content collections (MDX) for projects and writing. Tailwind CSS for styling. Editorial minimal design — cream palette, thin borders, no shadows, typography-driven. All pages share a base layout with structured data injection.

**Tech Stack:** Astro 5, Tailwind CSS 3, MDX, Zod (content schemas), @astrojs/sitemap

**Spec:** `docs/superpowers/specs/2026-07-18-portfolio-redesign-design.md`

---

## File Structure

```
NEW FILES:
  src/content/config.ts              — Content collection schemas (work + writing)
  src/content/work/dealers-dash.mdx  — Project case study
  src/content/work/marketifyall.mdx  — Project case study
  src/content/work/email-probe.mdx   — Project case study
  src/content/work/voice-call-center.mdx — Project case study
  src/content/work/rankops.mdx       — Project case study
  src/content/work/realstatevideo.mdx — Project case study
  src/content/writing/config.ts      — (not needed — schema in content/config.ts)
  src/content/writing/*.mdx          — Writing posts (placeholders)
  src/components/nav.astro           — Redesigned nav (overwrite)
  src/components/footer.astro        — Redesigned footer (overwrite)
  src/components/mobileNav.astro     — CSS-only mobile menu
  src/components/hero.astro          — Redesigned hero (overwrite)
  src/components/proofStrip.astro    — Stats/metrics row
  src/components/about.astro         — Redesigned about (overwrite)
  src/components/featuredWork.astro  — 3 featured project cards
  src/components/skills.astro        — Redesigned skills (overwrite)
  src/components/writingPreview.astro — Writing section preview
  src/components/contact.astro       — Redesigned contact (overwrite)
  src/components/projectCard.astro   — Reusable project card for grids
  src/components/caseStudyLayout.astro — Layout for case study pages
  src/components/breadcrumb.astro    — Breadcrumb navigation
  src/pages/work/index.astro         — Work index page
  src/pages/work/[slug].astro        — Dynamic case study pages
  src/pages/writing/index.astro      — Writing index page
  src/pages/writing/[slug].astro     — Dynamic writing posts

MODIFIED FILES:
  astro.config.mjs                   — Add @astrojs/mdx integration
  tailwind.config.mjs                — New design tokens
  src/layouts/Layout.astro           — New design system, structured data injection
  src/data/site.ts                   — Refined content
  src/pages/index.astro              — New home page composition

DELETED FILES:
  src/components/experience.astro    — Merged into about section
  src/components/sectionHeading.astro — Replaced inline
  src/components/svg/Burst.astro     — No longer fits editorial aesthetic
  src/components/svg/Squiggle.astro  — No longer fits editorial aesthetic
  src/components/svg/ArrowScribble.astro — No longer fits editorial aesthetic
  src/components/svg/Terminal.astro  — No longer fits editorial aesthetic
```

---

## Task 1: Foundation — Config, Design Tokens, Global Styles

Set up the new design system foundation: Tailwind tokens, global CSS, Astro config for MDX, and content collection schemas.

**Files:**
- Modify: `astro.config.mjs`
- Modify: `tailwind.config.mjs`
- Modify: `src/layouts/Layout.astro` (global styles only — full rewrite in Task 2)
- Create: `src/content/config.ts`

- [ ] **Step 1: Install @astrojs/mdx**

Run:
```bash
pnpm add @astrojs/mdx
```

- [ ] **Step 2: Update astro.config.mjs**

Replace the full contents of `astro.config.mjs`:

```js
// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://aadilhassan.in",
  integrations: [tailwind(), sitemap(), mdx()],
  vite: {
    resolve: {
      alias: {
        "@": "/src",
        "@components": "/src/components",
      },
    },
  },
  output: "static",
  build: {
    inlineStylesheets: "auto",
  },
  server: {
    host: true,
    port: 4321,
  },
});
```

- [ ] **Step 3: Update tailwind.config.mjs**

Replace the full contents of `tailwind.config.mjs`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF6EE",
        "paper-alt": "#F4F0E8",
        ink: "#1A1A1A",
        accent: "#FF4D00",
        sun: "#FFD02F",
        muted: "#6B675E",
        rule: "#D4D0C8",
      },
      fontFamily: {
        display: ['"Archivo Black"', "system-ui", "sans-serif"],
        sans: ['"Archivo Variable"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        content: "1120px",
        body: "65ch",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
          },
        },
      },
    },
  },
  plugins: [],
};
```

Note: removed all `boxShadow` and `borderWidth` extensions (no more brutal shadows or 3px borders).

- [ ] **Step 4: Replace global styles in Layout.astro**

Replace the entire `<style is:global>` block at the bottom of `src/layouts/Layout.astro` with:

```html
<style is:global>
  html {
    scroll-padding-top: 90px;
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: "Archivo Variable", system-ui, sans-serif;
    line-height: 1.65;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    color: #1a1a1a;
    background: #faf6ee;
  }

  ::selection {
    background-color: #ffd02f;
    color: #1a1a1a;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: #d4d0c8 #faf6ee;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #faf6ee;
  }
  ::-webkit-scrollbar-thumb {
    background: #d4d0c8;
    border-radius: 4px;
  }
</style>
```

- [ ] **Step 5: Create content collection schemas**

Create `src/content/config.ts`:

```ts
import { z, defineCollection } from "astro:content";

const work = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    kind: z.string(),
    year: z.string().optional(),
    stack: z.array(z.string()),
    featured: z.boolean().default(false),
    description: z.string(),
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
        })
      )
      .optional(),
    category: z.enum(["ai", "saas", "open-source"]).optional(),
    order: z.number().default(0),
  }),
});

const writing = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    description: z.string(),
  }),
});

export const collections = { work, writing };
```

- [ ] **Step 6: Create content directories**

```bash
mkdir -p src/content/work src/content/writing
```

- [ ] **Step 7: Verify build still passes**

Run: `pnpm run build`
Expected: Build succeeds (existing pages still work, empty collections are fine).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: design system foundation — tokens, config, content schemas"
```

---

## Task 2: Base Layout — Redesigned Layout.astro

Complete rewrite of the base layout with new design system, semantic HTML, and structured data injection.

**Files:**
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Rewrite Layout.astro**

Replace the full contents of `src/layouts/Layout.astro`:

```astro
---
import "@fontsource/archivo-black";
import "@fontsource-variable/archivo";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/700.css";
import { profile } from "@/data/site";

interface Props {
  title: string;
  description?: string;
  canonicalURL?: string;
  structuredData?: Record<string, unknown>[];
}

const {
  title,
  description = "Aadil Hassan — Senior Software Engineer. I build AI-native products end to end: LLM pipelines, real-time voice agents, and full-stack SaaS. Based in Ranchi, India.",
  canonicalURL = Astro.url.href,
  structuredData = [],
} = Astro.props;

const siteURL = "https://aadilhassan.in";

const baseSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aadil Hassan",
  url: siteURL,
  image: `${siteURL}/og.png`,
  description:
    "Senior Software Engineer building AI-native products end to end: LLM pipelines, real-time voice agents, and full-stack SaaS.",
  jobTitle: "Senior Software Engineer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ranchi",
    addressRegion: "Jharkhand",
    addressCountry: "IN",
  },
  email: profile.email,
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: [
    "TypeScript",
    "Python",
    "React",
    "Next.js",
    "FastAPI",
    "AWS",
    "Supabase",
    "PostgreSQL",
    "LLM Engineering",
    "QA & Test Automation",
    "Full-Stack Development",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "BITS Pilani",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Aadil Hassan — Portfolio",
  url: siteURL,
  description,
  author: { "@type": "Person", name: "Aadil Hassan" },
  inLanguage: "en",
};

const allSchema = [baseSchema, websiteSchema, ...structuredData];
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="author" content="Aadil Hassan" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={canonicalURL} />
    <meta name="theme-color" content="#FAF6EE" />
    <meta name="color-scheme" content="light" />
    <link rel="sitemap" href="/sitemap-index.xml" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content="Aadil Hassan" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:image" content={`${siteURL}/og.png`} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta
      property="og:image:alt"
      content="Aadil Hassan — Senior Software Engineer. Full-stack + AI, 10+ products shipped end to end."
    />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={`${siteURL}/og.png`} />

    <link rel="icon" href="/favicon.ico" sizes="48x48" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />

    {
      allSchema.map((schema) => (
        <script type="application/ld+json" set:html={JSON.stringify(schema)} />
      ))
    }
  </head>
  <body class="bg-paper text-ink antialiased">
    <slot />
  </body>
</html>

<style is:global>
  html {
    scroll-padding-top: 90px;
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: "Archivo Variable", system-ui, sans-serif;
    line-height: 1.65;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    color: #1a1a1a;
    background: #faf6ee;
  }

  ::selection {
    background-color: #ffd02f;
    color: #1a1a1a;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: #d4d0c8 #faf6ee;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #faf6ee;
  }
  ::-webkit-scrollbar-thumb {
    background: #d4d0c8;
    border-radius: 4px;
  }
</style>
```

- [ ] **Step 2: Verify build**

Run: `pnpm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: redesign base layout — editorial system, structured data injection"
```

---

## Task 3: Nav + Mobile Menu + Footer

**Files:**
- Modify: `src/components/nav.astro`
- Create: `src/components/mobileNav.astro`
- Modify: `src/components/footer.astro`

- [ ] **Step 1: Rewrite nav.astro**

Replace the full contents of `src/components/nav.astro`:

```astro
---
import { profile } from "@/data/site";
import MobileNav from "@/components/mobileNav.astro";

const links = [
  { label: "Work", href: "/work" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
---

<header class="sticky top-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-rule">
  <nav
    class="max-w-content mx-auto px-5 md:px-8 h-[64px] flex items-center justify-between gap-4"
  >
    <a
      href="/"
      class="font-mono font-bold text-base tracking-tight"
      aria-label="Home"
    >
      AADIL<span class="text-accent">.</span>HASSAN
    </a>

    <div class="hidden md:flex items-center gap-1">
      {
        links.map((l) => (
          <a
            href={l.href}
            class="font-mono text-[13px] font-medium px-3 py-2 text-muted hover:text-ink"
          >
            {l.label}
          </a>
        ))
      }
      <a
        href={profile.resume}
        target="_blank"
        rel="noopener"
        class="ml-3 font-mono text-[13px] font-bold bg-ink text-paper px-4 py-2 hover:bg-accent"
      >
        RÉSUMÉ
      </a>
    </div>

    <MobileNav />
  </nav>
</header>
```

- [ ] **Step 2: Create mobileNav.astro**

Create `src/components/mobileNav.astro`:

```astro
---
import { profile } from "@/data/site";

const links = [
  { label: "Work", href: "/work" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
---

<div class="md:hidden">
  <input type="checkbox" id="mobile-menu" class="peer hidden" />
  <label
    for="mobile-menu"
    class="flex items-center justify-center w-10 h-10 cursor-pointer"
    aria-label="Toggle menu"
  >
    <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
      <line x1="3" y1="5" x2="17" y2="5" />
      <line x1="3" y1="10" x2="17" y2="10" />
      <line x1="3" y1="15" x2="17" y2="15" />
    </svg>
  </label>

  <nav
    class="fixed inset-0 top-[64px] bg-paper z-40 translate-x-full peer-checked:translate-x-0 flex flex-col p-8 gap-2"
  >
    {
      links.map((l) => (
        <a
          href={l.href}
          class="font-mono text-lg font-medium py-3 border-b border-rule text-muted hover:text-ink"
        >
          {l.label}
        </a>
      ))
    }
    <a
      href={profile.resume}
      target="_blank"
      rel="noopener"
      class="mt-4 font-mono text-sm font-bold bg-ink text-paper px-5 py-3 text-center hover:bg-accent"
    >
      RÉSUMÉ
    </a>
  </nav>
</div>
```

- [ ] **Step 3: Rewrite footer.astro**

Replace the full contents of `src/components/footer.astro`:

```astro
---
import { profile } from "@/data/site";
---

<footer class="border-t border-rule mt-auto">
  <div
    class="max-w-content mx-auto px-5 md:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4"
  >
    <p class="font-mono text-[13px] text-muted">
      © 2026 {profile.name} · Ranchi, India
    </p>
    <div class="flex items-center gap-6 font-mono text-[13px] text-muted">
      <span>Built with Astro. Zero JS. Zero trackers.</span>
      <a
        href="#top"
        class="text-ink hover:text-accent"
      >
        TOP ↑
      </a>
    </div>
  </div>
</footer>
```

- [ ] **Step 4: Verify build**

Run: `pnpm run build`
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/nav.astro src/components/mobileNav.astro src/components/footer.astro
git commit -m "feat: editorial nav, CSS-only mobile menu, minimal footer"
```

---

## Task 4: Home Page — Hero, Proof Strip, About

**Files:**
- Create: `src/components/hero.astro` (overwrite)
- Create: `src/components/proofStrip.astro`
- Create: `src/components/about.astro` (overwrite)

- [ ] **Step 1: Rewrite hero.astro**

Replace the full contents of `src/components/hero.astro`:

```astro
---
import { profile } from "@/data/site";
---

<section id="top" class="border-b border-rule">
  <div class="max-w-content mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-16 md:pb-20">
    <p class="font-mono text-[12px] font-bold uppercase tracking-wider text-muted">
      {profile.title.toUpperCase()} — AVAILABLE FOR WORK
    </p>

    <h1 class="mt-6 font-display text-[14vw] sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.95]">
      Aadil Hassan
    </h1>

    <p class="mt-8 max-w-body text-lg md:text-xl leading-relaxed text-muted">
      {profile.tagline}
    </p>

    <div class="mt-10 flex flex-wrap items-center gap-4">
      <a
        href={`mailto:${profile.email}`}
        class="font-mono font-bold text-sm bg-accent text-paper px-6 py-3 hover:bg-ink"
      >
        Get in touch
      </a>
      <a
        href="/work"
        class="font-mono font-bold text-sm border border-ink px-6 py-3 hover:bg-paper-alt"
      >
        View work
      </a>
    </div>

    <p class="mt-10 font-mono text-[12px] text-muted">
      {profile.location} · {profile.availability}
    </p>
  </div>
</section>
```

- [ ] **Step 2: Create proofStrip.astro**

Create `src/components/proofStrip.astro`:

```astro
---
import { stats } from "@/data/site";
---

<section class="border-b border-rule">
  <div class="max-w-content mx-auto px-5 md:px-8 py-10 md:py-14">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
      {
        stats.map((s) => (
          <div>
            <div class="font-display text-2xl md:text-3xl">{s.value}</div>
            <div class="mt-2 font-mono text-[11px] font-medium uppercase tracking-wide text-muted leading-snug">
              {s.label}
            </div>
          </div>
        ))
      }
    </div>
  </div>
</section>
```

- [ ] **Step 3: Rewrite about.astro**

Replace the full contents of `src/components/about.astro`:

```astro
---
import { about } from "@/data/site";
---

<section id="about" class="border-b border-rule">
  <div class="max-w-content mx-auto px-5 md:px-8 py-20 md:py-32">
    <p class="font-mono text-[12px] font-bold uppercase tracking-wider text-muted mb-8">
      About
    </p>

    <div class="max-w-body space-y-6">
      {
        about.map((para) => (
          <p class="text-lg md:text-xl leading-relaxed">{para}</p>
        ))
      }
    </div>
  </div>
</section>
```

- [ ] **Step 4: Verify build**

Run: `pnpm run build`
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/hero.astro src/components/proofStrip.astro src/components/about.astro
git commit -m "feat: editorial hero, proof strip, about section"
```

---

## Task 5: Home Page — Featured Work, Skills, Writing Preview, Contact

**Files:**
- Create: `src/components/featuredWork.astro`
- Create: `src/components/projectCard.astro`
- Modify: `src/components/skills.astro` (overwrite)
- Create: `src/components/writingPreview.astro`
- Modify: `src/components/contact.astro` (overwrite)

- [ ] **Step 1: Create projectCard.astro**

Create `src/components/projectCard.astro`:

```astro
---
import type { Project } from "@/data/site";

interface Props {
  project: Project;
  index: number;
  slug?: string;
}

const { project, index, slug } = Astro.props;
---

<article class="border border-rule p-6 md:p-8 hover:border-ink group">
  <div class="flex items-start justify-between gap-4">
    <div class="flex items-baseline gap-4">
      <span class="font-mono text-[12px] text-muted">{String(index + 1).padStart(2, "0")}</span>
      <h3 class="font-display text-lg md:text-xl uppercase">{project.name}</h3>
    </div>
    {slug && (
      <a
        href={`/work/${slug}`}
        class="font-mono text-[12px] font-medium text-muted group-hover:text-accent shrink-0"
      >
        Case study →
      </a>
    )}
  </div>

  <p class="mt-2 font-mono text-[12px] font-medium text-muted uppercase tracking-wide">
    {project.kind}
  </p>

  <p class="mt-4 text-base leading-relaxed text-muted max-w-body">
    {project.description}
  </p>

  <div class="mt-5 flex flex-wrap gap-2">
    {project.stack.map((s) => (
      <span class="font-mono text-[11px] font-medium border border-rule px-2 py-0.5 text-muted">
        {s}
      </span>
    ))}
  </div>

  {project.links && (
    <div class="mt-4 flex flex-wrap gap-4">
      {project.links.map((l) => (
        <a
          href={l.href}
          target="_blank"
          rel="noopener"
          class="font-mono text-[13px] font-medium text-accent hover:underline underline-offset-4"
        >
          {l.label} ↗
        </a>
      ))}
    </div>
  )}
</article>
```

- [ ] **Step 2: Create featuredWork.astro**

Create `src/components/featuredWork.astro`:

```astro
---
import { projects } from "@/data/site";
import ProjectCard from "@/components/projectCard.astro";

const featured = projects.filter((p) => p.featured).slice(0, 3);
const slugMap: Record<string, string> = {
  "Dealer's Dash": "dealers-dash",
  MarketifyALL: "marketifyall",
  "email-probe": "email-probe",
  "AI Voice Call Center": "voice-call-center",
  RankOps: "rankops",
  RealStateVideo: "realstatevideo",
};
---

<section class="border-b border-rule">
  <div class="max-w-content mx-auto px-5 md:px-8 py-20 md:py-32">
    <p class="font-mono text-[12px] font-bold uppercase tracking-wider text-muted mb-10">
      Selected Work
    </p>

    <div class="grid gap-6">
      {
        featured.map((p, i) => (
          <ProjectCard project={p} index={i} slug={slugMap[p.name]} />
        ))
      }
    </div>

    <div class="mt-10">
      <a
        href="/work"
        class="font-mono text-sm font-bold text-accent hover:underline underline-offset-4"
      >
        View all work →
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Rewrite skills.astro**

Replace the full contents of `src/components/skills.astro`:

```astro
---
import { skills } from "@/data/site";
---

<section class="border-b border-rule">
  <div class="max-w-content mx-auto px-5 md:px-8 py-20 md:py-32">
    <p class="font-mono text-[12px] font-bold uppercase tracking-wider text-muted mb-10">
      Skills & Tools
    </p>

    <div class="flex flex-wrap gap-2">
      {
        skills.map((group) =>
          group.items.map((item) => (
            <span class="font-mono text-[12px] font-medium border border-rule px-3 py-1.5 text-muted hover:text-ink hover:border-ink">
              {item}
            </span>
          ))
        )
      }
    </div>
  </div>
</section>
```

- [ ] **Step 4: Create writingPreview.astro**

Create `src/components/writingPreview.astro`:

```astro
---
import { getCollection } from "astro:content";

const posts = await getCollection("writing");
const recent = posts
  .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
  .slice(0, 3);
---

{recent.length > 0 && (
  <section class="border-b border-rule">
    <div class="max-w-content mx-auto px-5 md:px-8 py-20 md:py-32">
      <p class="font-mono text-[12px] font-bold uppercase tracking-wider text-muted mb-10">
        Writing
      </p>

      <div class="grid gap-6">
        {recent.map((post) => (
          <a href={`/writing/${post.slug}`} class="group block border border-rule p-6 hover:border-ink">
            <div class="flex items-baseline justify-between gap-4">
              <h3 class="font-display text-lg uppercase">{post.data.title}</h3>
              <time
                class="font-mono text-[12px] text-muted shrink-0"
                datetime={post.data.date}
              >
                {new Date(post.data.date).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </time>
            </div>
            <p class="mt-3 text-base text-muted leading-relaxed">{post.data.excerpt}</p>
            <span class="mt-3 inline-block font-mono text-[12px] font-medium text-accent group-hover:underline underline-offset-4">
              Read →
            </span>
          </a>
        ))}
      </div>

      {posts.length > 3 && (
        <div class="mt-10">
          <a
            href="/writing"
            class="font-mono text-sm font-bold text-accent hover:underline underline-offset-4"
          >
            All writing →
          </a>
        </div>
      )}
    </div>
  </section>
)}
```

- [ ] **Step 5: Rewrite contact.astro**

Replace the full contents of `src/components/contact.astro`:

```astro
---
import { profile } from "@/data/site";
---

<section id="contact" class="border-b border-rule">
  <div class="max-w-content mx-auto px-5 md:px-8 py-20 md:py-32">
    <p class="font-mono text-[12px] font-bold uppercase tracking-wider text-muted mb-8">
      Contact
    </p>

    <h2 class="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.0] max-w-3xl">
      Let's build something that ships.
    </h2>

    <p class="mt-8 text-lg md:text-xl leading-relaxed text-muted max-w-body">
      Open to senior full-stack and AI engineering roles, and to interesting
      contract work. The fastest way to reach me is email.
    </p>

    <div class="mt-10">
      <a
        href={`mailto:${profile.email}`}
        class="inline-block font-mono font-bold text-lg md:text-xl border border-ink px-6 py-4 hover:bg-paper-alt break-all"
      >
        {profile.email}
      </a>
    </div>

    <div class="mt-10 flex flex-wrap items-center gap-6 font-mono text-sm">
      <a
        href={profile.github}
        target="_blank"
        rel="noopener me"
        class="text-accent hover:underline underline-offset-4"
      >
        GitHub ↗
      </a>
      <a
        href={profile.linkedin}
        target="_blank"
        rel="noopener me"
        class="text-accent hover:underline underline-offset-4"
      >
        LinkedIn ↗
      </a>
      <a
        href={profile.resume}
        target="_blank"
        rel="noopener"
        class="text-accent hover:underline underline-offset-4"
      >
        Résumé ↓
      </a>
      <span class="text-muted">{profile.location}</span>
    </div>
  </div>
</section>
```

- [ ] **Step 6: Verify build**

Run: `pnpm run build`
Expected: Build succeeds.

- [ ] **Step 7: Commit**

```bash
git add src/components/featuredWork.astro src/components/projectCard.astro src/components/skills.astro src/components/writingPreview.astro src/components/contact.astro
git commit -m "feat: featured work, skills, writing preview, contact — editorial style"
```

---

## Task 6: Compose Home Page + Update site.ts + Clean Up

Wire all sections into the home page, refine content in site.ts, and delete obsolete components.

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/data/site.ts`
- Delete: `src/components/experience.astro`
- Delete: `src/components/sectionHeading.astro`
- Delete: `src/components/svg/Burst.astro`
- Delete: `src/components/svg/Squiggle.astro`
- Delete: `src/components/svg/ArrowScribble.astro`
- Delete: `src/components/svg/Terminal.astro`

- [ ] **Step 1: Rewrite index.astro**

Replace the full contents of `src/pages/index.astro`:

```astro
---
import Layout from "@/layouts/Layout.astro";
import Nav from "@/components/nav.astro";
import Hero from "@/components/hero.astro";
import ProofStrip from "@/components/proofStrip.astro";
import About from "@/components/about.astro";
import FeaturedWork from "@/components/featuredWork.astro";
import Skills from "@/components/skills.astro";
import WritingPreview from "@/components/writingPreview.astro";
import Contact from "@/components/contact.astro";
import Footer from "@/components/footer.astro";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Aadil Hassan's tech stack?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Python (FastAPI, Django), TypeScript, React, Next.js, Node.js, PostgreSQL/Supabase, AWS. AI/LLM: Claude API, LangGraph, RAG with Qdrant, real-time voice AI (Twilio/Deepgram/ElevenLabs).",
      },
    },
    {
      "@type": "Question",
      name: "Is Aadil available for remote work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Based in Ranchi, India (UTC+5:30). Available for remote roles with US Eastern or EU timezone overlap. Currently open to senior full-stack and AI engineering roles.",
      },
    },
    {
      "@type": "Question",
      name: "What kind of projects has Aadil shipped?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "10+ products end to end including AI revenue optimization platforms, real-time voice call centers, multi-tenant marketing SaaS (170 active users), a published npm SDK for email deliverability, and autonomous SEO agents.",
      },
    },
  ],
};
---

<Layout
  title="Aadil Hassan — Senior Software Engineer"
  structuredData={[faqSchema]}
>
  <Nav />
  <main>
    <Hero />
    <ProofStrip />
    <About />
    <FeaturedWork />
    <Skills />
    <WritingPreview />
    <Contact />
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 2: Update site.ts with refined content**

Replace the full contents of `src/data/site.ts`:

```ts
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
      "Turns property listings into platform-optimized marketing videos: vision + script generation, viral-hook scoring, TTS, word-level caption alignment, automated FFmpeg rendering, and quality-eval that gates bad renders.",
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
```

- [ ] **Step 3: Delete obsolete components**

```bash
rm src/components/experience.astro src/components/sectionHeading.astro
rm src/components/svg/Burst.astro src/components/svg/Squiggle.astro
rm src/components/svg/ArrowScribble.astro src/components/svg/Terminal.astro
rmdir src/components/svg
```

- [ ] **Step 4: Verify build**

Run: `pnpm run build`
Expected: Build succeeds. Home page renders with all new sections.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: compose editorial home page, refine content, remove obsolete components"
```

---

## Task 7: Work Index Page

**Files:**
- Create: `src/pages/work/index.astro`

- [ ] **Step 1: Create work index page**

Create `src/pages/work/index.astro`:

```astro
---
import Layout from "@/layouts/Layout.astro";
import Nav from "@/components/nav.astro";
import Footer from "@/components/footer.astro";
import ProjectCard from "@/components/projectCard.astro";
import { projects } from "@/data/site";

const slugMap: Record<string, string> = {
  "Dealer's Dash": "dealers-dash",
  MarketifyALL: "marketifyall",
  "email-probe": "email-probe",
  "AI Voice Call Center": "voice-call-center",
  RankOps: "rankops",
  RealStateVideo: "realstatevideo",
};
---

<Layout title="Work — Aadil Hassan" description="Selected projects: AI platforms, SaaS products, open-source tools, and developer infrastructure.">
  <Nav />
  <main>
    <section class="border-b border-rule">
      <div class="max-w-content mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-20 md:pb-32">
        <p class="font-mono text-[12px] font-bold uppercase tracking-wider text-muted mb-4">
          Work
        </p>
        <h1 class="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.0]">
          Selected projects.
        </h1>
        <p class="mt-6 text-lg text-muted max-w-body leading-relaxed">
          AI platforms, SaaS products, open-source tools, and developer infrastructure — built end to end, mostly solo.
        </p>
      </div>
    </section>

    <section class="border-b border-rule">
      <div class="max-w-content mx-auto px-5 md:px-8 pb-20 md:pb-32">
        <div class="grid gap-6">
          {
            projects.map((p, i) => (
              <ProjectCard project={p} index={i} slug={slugMap[p.name]} />
            ))
          }
        </div>

        <div class="mt-12 border border-rule p-6">
          <p class="text-base leading-relaxed">
            <span class="font-mono font-bold text-sm uppercase">Also built /</span>
            <span class="text-muted"> penpot-mcp (MCP server for LLM-driven design edits) · Cortex (RAG voice tutor, Dockerized) · a multimodal vision → Qdrant RAG pipeline · an MCP-backed personal-finance dashboard.</span>
          </p>
        </div>
      </div>
    </section>
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 2: Verify build**

Run: `pnpm run build`
Expected: Build succeeds. `/work` page renders.

- [ ] **Step 3: Commit**

```bash
git add src/pages/work/index.astro
git commit -m "feat: work index page — project grid with case study links"
```

---

## Task 8: Case Study Template + 6 Project MDX Files

**Files:**
- Create: `src/components/caseStudyLayout.astro`
- Create: `src/components/breadcrumb.astro`
- Create: `src/pages/work/[slug].astro`
- Create: `src/content/work/dealers-dash.mdx`
- Create: `src/content/work/marketifyall.mdx`
- Create: `src/content/work/email-probe.mdx`
- Create: `src/content/work/voice-call-center.mdx`
- Create: `src/content/work/rankops.mdx`
- Create: `src/content/work/realstatevideo.mdx`

- [ ] **Step 1: Create breadcrumb.astro**

Create `src/components/breadcrumb.astro`:

```astro
---
interface Props {
  items: { label: string; href?: string }[];
}

const { items } = Astro.props;
---

<nav aria-label="Breadcrumb" class="font-mono text-[12px] text-muted">
  <ol class="flex items-center gap-2">
    {items.map((item, i) => (
      <li class="flex items-center gap-2">
        {i > 0 && <span class="text-rule">/</span>}
        {item.href ? (
          <a href={item.href} class="hover:text-ink">{item.label}</a>
        ) : (
          <span class="text-ink">{item.label}</span>
        )}
      </li>
    ))}
  </ol>
</nav>
```

- [ ] **Step 2: Create caseStudyLayout.astro**

Create `src/components/caseStudyLayout.astro`:

```astro
---
import Breadcrumb from "@/components/breadcrumb.astro";

interface Props {
  title: string;
  kind: string;
  year?: string;
  stack: string[];
  links?: { label: string; href: string }[];
}

const { title, kind, year, stack, links } = Astro.props;
---

<div>
  <div class="border-b border-rule">
    <div class="max-w-content mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-12 md:pb-16">
      <Breadcrumb items={[{ label: "Work", href: "/work" }, { label: title }]} />

      <h1 class="mt-6 font-display text-4xl sm:text-5xl md:text-6xl leading-[1.0]">
        {title}
      </h1>

      <p class="mt-4 font-mono text-[13px] font-medium text-muted uppercase tracking-wide">
        {kind}
      </p>

      {year && (
        <p class="mt-2 font-mono text-[12px] text-muted">{year}</p>
      )}

      <div class="mt-6 flex flex-wrap gap-2">
        {stack.map((s) => (
          <span class="font-mono text-[11px] font-medium border border-rule px-2.5 py-1 text-muted">
            {s}
          </span>
        ))}
      </div>

      {links && links.length > 0 && (
        <div class="mt-6 flex flex-wrap gap-4">
          {links.map((l) => (
            <a
              href={l.href}
              target="_blank"
              rel="noopener"
              class="font-mono text-[13px] font-medium text-accent hover:underline underline-offset-4"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  </div>

  <div class="max-w-content mx-auto px-5 md:px-8 py-16 md:py-20">
    <article class="max-w-body">
      <slot />
    </article>
  </div>
</div>
```

- [ ] **Step 3: Create work/[slug].astro**

Create `src/pages/work/[slug].astro`:

```astro
---
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import Layout from "@/layouts/Layout.astro";
import Nav from "@/components/nav.astro";
import Footer from "@/components/footer.astro";
import CaseStudyLayout from "@/components/caseStudyLayout.astro";

export async function getStaticPaths() {
  const entries = await getCollection("work");
  return entries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await entry.render();

const projectSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: entry.data.title,
  description: entry.data.description,
  applicationCategory: entry.data.kind,
  datePublished: entry.data.year || "2024",
  author: {
    "@type": "Person",
    name: "Aadil Hassan",
  },
};
---

<Layout
  title={`${entry.data.title} — Aadil Hassan`}
  description={entry.data.description}
  structuredData={[projectSchema]}
>
  <Nav />
  <main>
    <CaseStudyLayout
      title={entry.data.title}
      kind={entry.data.kind}
      year={entry.data.year}
      stack={entry.data.stack}
      links={entry.data.links}
    >
      <Content />
    </CaseStudyLayout>
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 4: Create Dealer's Dash case study**

Create `src/content/work/dealers-dash.mdx`:

```mdx
---
title: "Dealer's Dash"
kind: "AI revenue optimization for auto dealerships"
year: "2024"
stack: ["AWS", "Python", "LLM fine-tuning", "LlamaParse", "NL query"]
featured: true
description: "A financial-data platform that pairs a fine-tuned LLM with a deterministic math engine to parse dealership statements and surface revenue opportunities — cutting plan-to-action time by ~90%."
category: "ai"
order: 1
links: []
---

Dealer's Dash is a financial-data platform built entirely on AWS that parses raw and scanned dealership financial statements into structured data, then surfaces revenue-optimization opportunities through natural-language queries. The system pairs a fine-tuned LLM with a deterministic math engine so the numbers are always exact.

## The Problem

Auto dealership owners and their finance teams work with large volumes of financial statements — often scanned PDFs with inconsistent formatting. Extracting actionable insights required manual data entry, cross-referencing multiple documents, and running spreadsheets by hand. Non-technical stakeholders had no way to ask questions about their own data without going through an analyst.

The existing workflow took days. Owners would identify a potential revenue issue, hand the documents to an analyst, wait for a report, then schedule a meeting to review it. By the time they acted, the window had often closed.

## The Approach

The system has three layers: ingestion, analysis, and interaction.

**Ingestion** uses LlamaParse to extract structured data from raw and scanned financial documents — PDFs, spreadsheets, and images. The parser handles inconsistent formatting across different dealerships and document types.

**Analysis** pairs a fine-tuned LLM with a deterministic math engine. The LLM understands natural-language queries and maps them to the right data fields. Every calculation — revenue projections, margin analysis, trend comparisons — routes through the deterministic engine. The LLM never does arithmetic.

**Interaction** lets non-technical stakeholders ask questions in plain English and get dashboards back. "Show me F&I revenue trend for the last two quarters" produces a rendered chart, not a data dump.

## Key Decisions

**LLM + deterministic math engine.** LLMs hallucinate arithmetic. For financial data where exactness is non-negotiable, every calculation routes through a deterministic math layer. The LLM handles intent parsing and response generation; the math engine handles numbers. Result: zero calculation errors in production.

**Fine-tuned model over prompt engineering.** Generic LLMs couldn't reliably parse dealership-specific financial terminology and document structures. Fine-tuning on domain-specific data improved extraction accuracy from ~70% to ~95%, eliminating the need for manual correction on most documents.

**AWS-native architecture.** The client's infrastructure was already on AWS. Building entirely within AWS (Lambda, S3, ECS) avoided cross-cloud complexity and kept latency low for US-based dealerships.

## Results

- **~90% reduction** in plan-to-action time — owners go from question to insight in minutes instead of days
- **Zero calculation errors** in production financial reports
- **Non-technical users** query data directly without analyst involvement
- Handles **inconsistent document formats** across dozens of dealership groups

## Retrospective

The fine-tuning investment paid off significantly — the accuracy gains eliminated the biggest bottleneck (manual data correction). If I were building this again, I'd invest earlier in evaluation infrastructure: systematic benchmarks for extraction accuracy, regression tests for the math engine, and monitoring for model drift. The deterministic math layer was the right call — it turned an unreliable component (LLM arithmetic) into a non-issue.
```

- [ ] **Step 5: Create MarketifyALL case study**

Create `src/content/work/marketifyall.mdx`:

```mdx
---
title: "MarketifyALL"
kind: "Multi-tenant marketing SaaS · 170 active users"
year: "2024"
stack: ["Next.js", "Supabase (RLS/RBAC)", "OpenAI / Claude", "Vercel"]
featured: true
description: "Multi-tenant marketing platform taken from empty repo to 170 active users — AI content, social publishing, email, SEO, lead CRM, with per-workspace LLM cost metering and Stripe billing."
category: "saas"
order: 2
links:
  - label: "marketifyall.com"
    href: "https://marketifyall.com"
---

MarketifyALL is a multi-tenant marketing SaaS that combines AI content generation, social media publishing, email marketing, SEO tracking, landing pages, and a lead CRM — all driven by an AI chat command-center. Built from empty repo to 170 active users with per-workspace LLM cost metering and Stripe billing.

## The Problem

Small marketing teams juggle 5–8 separate tools: one for content, one for social scheduling, one for email, one for SEO, one for landing pages, one for CRM. Each tool has its own login, its own data, and its own learning curve. Context-switching kills productivity, and none of the tools talk to each other.

Existing all-in-one platforms (HubSpot, etc.) are expensive and overbuilt for small teams. What was missing: a single command-center where you could say "write a blog post about X, schedule it to LinkedIn, and create a landing page" — and have it actually happen.

## The Approach

**AI chat command-center.** Every action starts from a natural-language command. "Write a LinkedIn post about our new feature" or "Create a landing page for the spring sale" — the AI interprets intent, executes across modules, and reports back.

**Multi-tenant architecture** with Supabase RLS (Row Level Security) and RBAC (Role-Based Access Control). Each workspace is fully isolated. Per-workspace LLM cost metering tracks token usage and spend per tenant — critical for a SaaS where LLM costs can spiral.

**Stripe billing** with usage-based pricing. Each workspace has a plan, and LLM costs are metered and billed on top of the base subscription.

**Modular feature set:**
- AI content generation (blog posts, social captions, email copy)
- Social publishing (Facebook, Instagram, X, LinkedIn)
- Email marketing with templates and scheduling
- SEO rank tracking and site audits
- Landing page builder
- Lead CRM with pipeline management

## Key Decisions

**Supabase over custom backend.** Row Level Security handles multi-tenant isolation at the database level — no application-level tenant filtering bugs possible. Real-time subscriptions handle live updates across team members. Auth, storage, and edge functions included.

**Per-workspace LLM cost metering.** Every LLM call is tagged with the workspace ID and model used. Token counts are logged and aggregated. This prevents one tenant's usage from silently eating into margins — a common failure mode in AI SaaS.

**Next.js + Vercel.** The team is small (solo-built). Next.js App Router with server components handles the complexity of multi-tenant data fetching without a separate backend server. Vercel handles deployment, preview environments, and edge caching.

## Results

- **170 active users** on the free tier
- **Zero infrastructure management** — Vercel + Supabase handle scaling
- **Per-workspace cost visibility** — every tenant's LLM spend is tracked and billable
- **Full feature parity** with standalone tools (content, social, email, SEO, CRM) in one interface

## Retrospective

The chat-first UX was the right bet — users who tried it adopted it as their primary workflow. The cost metering system prevented what would have been an existential problem (uncontrolled LLM costs). If rebuilding, I'd add more structured evals for content quality, and I'd consider a stronger onboarding flow — the command-center is powerful but has a learning curve for users expecting a traditional dashboard.
```

- [ ] **Step 6: Create email-probe case study**

Create `src/content/work/email-probe.mdx`:

```mdx
---
title: "email-probe"
kind: "Published npm SDK · zero runtime deps"
year: "2024"
stack: ["TypeScript", "Vitest", "RabbitMQ", "npm"]
featured: true
description: "A 7-layer email-deliverability pipeline with batch processing and full test coverage — cut marketing-email bounce rate by ~95%."
category: "open-source"
order: 3
links:
  - label: "GitHub"
    href: "https://github.com/aadilhassan"
---

email-probe is a 7-layer email-deliverability verification pipeline published as an npm SDK with zero runtime dependencies. It performs syntax validation, DNS/MX lookup, disposable address detection, role account detection, typo correction, catch-all detection, and live SMTP inbox verification — in sequence, with early termination. Built to cut marketing-email bounce rates by catching undeliverable addresses before send time.

## The Problem

Marketing teams at CribStore were sending emails to lists with 15–20% bounce rates. Every bounced email wastes money (ESP billing), damages sender reputation (which affects deliverability for legitimate emails), and risks getting flagged as spam. Existing email verification services (ZeroBounce, Hunter) were either too expensive at scale or unreliable for the specific patterns we were seeing.

## The Approach

A pipeline of 7 verification layers, each running in sequence with early termination (if a lower layer rejects, higher layers don't run):

1. **Syntax** — RFC 5322 validation with edge-case handling
2. **DNS/MX** — verify the domain has mail exchange records
3. **Disposable** — detect throwaway email services (burner domains)
4. **Role** — detect role-based addresses (info@, admin@, support@) that bounce
5. **Typo correction** — detect common misspellings (gmial.com → gmail.com)
6. **Catch-all** — detect domains that accept all addresses (unreliable deliverability)
7. **Live SMTP** — connect to the mail server and verify the specific mailbox exists

Batch processing with RabbitMQ for queue distribution. Full unit-test coverage on every layer.

## Key Decisions

**Sequential pipeline with early termination.** Running all 7 layers on every address wastes time and money. If syntax fails, there's no point checking DNS. If DNS fails, there's no point checking SMTP. Early termination cuts average verification time by ~60%.

**Zero runtime dependencies.** The SDK ships with no runtime dependencies — only dev dependencies for testing and building. This reduces supply-chain risk, minimizes install size, and ensures the SDK doesn't break when a transitive dependency updates.

**Dual ESM/CJS build.** Published as both ES modules and CommonJS so it works in any Node.js project regardless of module system. Vitest for testing (fast, native ESM support).

**Live SMTP as the final layer.** SMTP verification is the most accurate but also the slowest and most resource-intensive. It's positioned last so only addresses that pass all faster checks get SMTP-verified. This keeps throughput high for large lists.

## Results

- **~95% bounce rate reduction** for marketing email campaigns
- **Thousands of dollars saved** in ESP send costs
- **Zero runtime dependencies** — minimal supply-chain surface
- **Full test coverage** on every verification layer
- **Published on npm** as a reusable SDK

## Retrospective

The sequential pipeline architecture was the key insight — it made verification fast and cheap by eliminating unnecessary work. The zero-dependency approach paid off in reliability (no breaking changes from upstream). If rebuilding, I'd add a micro AI model for "sketchy address" detection (patterns that look valid but aren't) — this was the one gap that the deterministic layers couldn't close.
```

- [ ] **Step 7: Create Voice Call Center case study**

Create `src/content/work/voice-call-center.mdx`:

```mdx
---
title: "AI Voice Call Center"
kind: "Autonomous phone agents"
year: "2025"
stack: ["Next.js", "PostgreSQL", "Redis", "Twilio"]
description: "Real-time voice agent over Twilio Media Streams — Deepgram STT, ElevenLabs TTS, Groq-served LLMs, Qdrant RAG, with barge-in, post-call eval loops, and an embeddable widget."
category: "ai"
order: 4
links: []
---

An autonomous real-time voice agent built end to end: live phone calls over Twilio Media Streams, with Deepgram for speech-to-text, ElevenLabs for text-to-speech, Groq-served LLMs for conversation, Qdrant RAG for knowledge grounding, barge-in for natural interaction, and a post-call evaluation loop that scores conversations and feeds improvements back into prompts. Shipped with a one-line embeddable widget.

## The Problem

Businesses need phone support but hiring, training, and retaining call center staff is expensive and unreliable. Existing AI voice solutions either sound robotic (long latency), can't handle interruptions (no barge-in), lack domain knowledge (no RAG), or don't improve over time (no eval loop). The gap: a voice agent that sounds natural, handles real conversations, knows the business, and gets better automatically.

## The Approach

**Twilio Media Streams** handles the telephony layer — inbound and outbound calls streamed as real-time audio. The agent runs as a WebSocket server that processes audio frames.

**Deepgram STT** converts speech to text with low latency. **ElevenLabs TTS** generates natural-sounding speech. **Groq** serves LLM inference at speeds fast enough for sub-second conversational turns.

**Barge-in** — the user can interrupt the agent mid-sentence. The system detects voice activity during playback, stops TTS output, and processes the interruption as a new user turn. This is critical for natural conversation — people interrupt constantly.

**Qdrant RAG** grounds every response in the business's knowledge base. The agent doesn't hallucinate answers — it retrieves relevant context from Qdrant before generating a response.

**Post-call eval loop** — after every call, an LLM scores the conversation on resolution quality, tone, accuracy, and completeness. Low-scoring conversations are flagged for review. Patterns in low scores feed back into prompt improvements.

## Key Decisions

**Groq for inference speed.** Conversational voice AI needs sub-500ms response times. Groq's LPU inference delivers LLM responses fast enough that conversations feel natural. Standard cloud LLM APIs were too slow for real-time voice.

**Barge-in via voice activity detection.** Rather than a button or keyword, the system listens for speech during TTS playback and automatically interrupts. This requires careful audio pipeline management — TTS output and STT input share the same audio channel.

**Post-call evaluation as a separate LLM call.** Scoring happens asynchronously after the call ends, using a different LLM call with the full transcript. This doesn't add latency to the live conversation but provides systematic quality measurement.

## Results

- **Sub-second conversational turns** with barge-in
- **Knowledge-grounded responses** via RAG — no hallucinated answers
- **Automatic quality improvement** via post-call eval loop
- **One-line embeddable widget** for integration into any website
- Handles **inbound and outbound** calls

## Retrospective

The eval loop is the most valuable part — it turned a static system into one that improves over time. Barge-in was harder than expected (audio pipeline management is tricky) but it's what separates a demo from a production system. If rebuilding, I'd invest more in turn-taking intelligence (knowing when the user is done speaking vs. pausing to think) and add multi-language support.
```

- [ ] **Step 8: Create RankOps case study**

Create `src/content/work/rankops.mdx`:

```mdx
---
title: "RankOps"
kind: "Autonomous SEO agent"
year: "2025"
stack: ["Claude", "LangGraph", "Trigger.dev", "OpenTelemetry"]
description: "An autonomous agent that finds underperforming pages, rewrites metadata with Claude + LangGraph, deploys to Webflow, A/B tests the change, and auto-reverts if CTR doesn't improve."
category: "ai"
order: 5
links: []
---

RankOps is an autonomous SEO agent in production that connects to Google Search Console, identifies underperforming pages, generates optimized metadata using Claude and LangGraph, deploys changes to Webflow CMS, then A/B tests the results and auto-reverts any change that doesn't improve click-through rate. It's an agent that governs its own output.

## The Problem

SEO metadata optimization is high-volume, low-creativity work. A typical site has hundreds of pages with suboptimal titles and descriptions. Manually rewriting them takes an SEO team weeks. And after rewriting, there's no systematic way to know if the changes actually helped — most teams just deploy and hope.

## The Approach

**ETL pipeline** pulls search performance data from Google Search Console — pages, queries, impressions, clicks, CTR, position. Identifies pages that get impressions but low clicks (the biggest opportunity).

**LangGraph agent** takes an underperforming page, retrieves the current content and metadata, generates optimized title and description using Claude, and produces a structured output.

**Webflow CMS integration** deploys the change automatically — no manual copy-paste, no developer involvement.

**A/B testing** runs for a configurable period (default: 2 weeks). Compares CTR of the new metadata against the baseline. If CTR doesn't improve meaningfully, the change is auto-reverted.

**OpenTelemetry + Sentry** instrumentation tracks every step: which pages were selected, what was generated, what was deployed, what the test results were. Full observability into the agent's decision-making.

## Key Decisions

**Auto-revert on failure.** The agent doesn't just deploy and forget. Every change is measured. If the new metadata doesn't improve CTR, it's rolled back automatically. This makes the system safe to run unsupervised — bad changes are temporary.

**LangGraph for orchestration.** The workflow has multiple steps with conditional branching (skip pages that are already optimized, retry on API failures, route to different prompts based on page type). LangGraph handles this state machine cleanly.

**Trigger.dev for scheduling.** The ETL pipeline, agent runs, and A/B test evaluations are all scheduled jobs. Trigger.dev handles retries, dead-letter queues, and monitoring.

## Results

- **Autonomous operation** — runs without human intervention
- **Self-governing** — reverts changes that don't work
- **Full observability** — every decision logged and traceable via OpenTelemetry
- **Measurable impact** — every change has a before/after CTR comparison

## Retrospective

The auto-revert mechanism is what makes this production-safe. Without it, an agent that makes bad changes is worse than no agent at all. The measurement-first approach (test every change, revert failures) is a pattern I'd apply to any autonomous system. If rebuilding, I'd add more sophisticated segmentation — different strategies for different page types, and I'd track downstream conversion impact, not just CTR.
```

- [ ] **Step 9: Create RealStateVideo case study**

Create `src/content/work/realstatevideo.mdx`:

```mdx
---
title: "RealStateVideo"
kind: "Live SaaS · Stripe billing"
year: "2024"
stack: ["Astro / React", "Supabase", "Trigger.dev", "FFmpeg"]
description: "A video-marketing SaaS that turns property listings into platform-optimized videos — vision + script generation, viral-hook scoring, TTS, caption alignment, automated FFmpeg rendering, and quality gating."
category: "saas"
order: 6
links:
  - label: "realstatevideo.com"
    href: "https://realstatevideo.com"
---

RealStateVideo is a live SaaS that turns real-estate property listings into platform-optimized marketing videos. It handles the full pipeline: vision-based property analysis, script generation with viral-hook scoring, text-to-speech narration, word-level caption alignment, automated FFmpeg rendering, and a quality-evaluation step that gates bad renders before delivery.

## The Problem

Real-estate agents need short marketing videos for every listing — for Instagram, TikTok, YouTube Shorts, and property portals. Producing these manually takes 30–60 minutes per video (script, record voiceover, edit, add captions, export). Agents have dozens of listings. The math doesn't work.

## The Approach

**Vision analysis** takes property photos and extracts key features (rooms, square footage, highlights) using a multimodal LLM.

**Script generation** writes a video script optimized for the target platform (vertical for TikTok, landscape for YouTube). A viral-hook scoring step evaluates the opening line and regenerates if the score is below threshold.

**TTS + caption alignment** generates narration via text-to-speech and aligns captions at the word level for precise subtitle timing.

**FFmpeg rendering** composites the video: property photos with Ken Burns effect, captions, platform-specific aspect ratio, and branding. Fully automated — no manual editing.

**Quality eval** runs an LLM assessment on the final render: checks audio sync, caption readability, script coherence, and overall quality. Renders that don't pass are flagged for regeneration.

**Stripe billing** handles subscriptions. Public REST API for programmatic access.

## Key Decisions

**Quality gate before delivery.** Most AI video tools ship whatever the model produces. A quality-eval step catches bad renders (audio out of sync, gibberish captions, incoherent scripts) before they reach the user. This trades a small amount of latency for significantly higher output quality.

**Platform-specific generation.** A TikTok video has different requirements than a YouTube video — different aspect ratio, different script style, different hook strategy. Generating platform-specific output (rather than one-size-fits-all) dramatically improves engagement.

**Trigger.dev for pipeline orchestration.** The video generation pipeline has 6+ sequential steps with different failure modes. Trigger.dev handles retries, timeouts, and job monitoring.

## Results

- **Automated end-to-end** — listing photos in, marketing video out
- **Platform-optimized** output for Instagram, TikTok, YouTube
- **Quality-gated** renders — bad videos don't ship
- **Live SaaS** with Stripe billing and public API
- Reduces per-video production time from **30–60 minutes to under 5**

## Retrospective

The quality gate was the highest-ROI decision — it turned inconsistent AI output into reliably good videos. Platform-specific generation was also key (agents noticed the difference immediately). If rebuilding, I'd add more template variety and a direct integration with listing platforms (MLS import) to eliminate the manual photo-upload step.
```

- [ ] **Step 10: Verify build**

Run: `pnpm run build`
Expected: Build succeeds. All 6 case study pages generate.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: case study template + 6 project case studies (MDX)"
```

---

## Task 9: Writing Section

**Files:**
- Create: `src/pages/writing/index.astro`
- Create: `src/pages/writing/[slug].astro`

- [ ] **Step 1: Create writing index page**

Create `src/pages/writing/index.astro`:

```astro
---
import Layout from "@/layouts/Layout.astro";
import Nav from "@/components/nav.astro";
import Footer from "@/components/footer.astro";
import { getCollection } from "astro:content";

const posts = await getCollection("writing");
const sorted = posts.sort(
  (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
);

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Aadil Hassan — Writing",
  url: "https://aadilhassan.in/writing",
  description: "Thoughts on AI engineering, product development, and building software end to end.",
  author: {
    "@type": "Person",
    name: "Aadil Hassan",
    url: "https://aadilhassan.in",
  },
};
---

<Layout
  title="Writing — Aadil Hassan"
  description="Thoughts on AI engineering, product development, and building software end to end."
  structuredData={[blogSchema]}
>
  <Nav />
  <main>
    <section class="border-b border-rule">
      <div class="max-w-content mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-20 md:pb-32">
        <p class="font-mono text-[12px] font-bold uppercase tracking-wider text-muted mb-4">
          Writing
        </p>
        <h1 class="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.0]">
          Thoughts & notes.
        </h1>
        <p class="mt-6 text-lg text-muted max-w-body leading-relaxed">
          Occasional writing on AI engineering, product development, and the realities of building software end to end.
        </p>
      </div>
    </section>

    <section class="border-b border-rule">
      <div class="max-w-content mx-auto px-5 md:px-8 pb-20 md:pb-32">
        {sorted.length === 0 ? (
          <p class="text-lg text-muted">Coming soon.</p>
        ) : (
          <div class="grid gap-6">
            {sorted.map((post) => (
              <a
                href={`/writing/${post.slug}`}
                class="group block border border-rule p-6 hover:border-ink"
              >
                <div class="flex items-baseline justify-between gap-4">
                  <h2 class="font-display text-lg uppercase">{post.data.title}</h2>
                  <time
                    class="font-mono text-[12px] text-muted shrink-0"
                    datetime={post.data.date}
                  >
                    {new Date(post.data.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <p class="mt-3 text-base text-muted leading-relaxed">{post.data.excerpt}</p>
                <span class="mt-3 inline-block font-mono text-[12px] font-medium text-accent group-hover:underline underline-offset-4">
                  Read →
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 2: Create writing post page**

Create `src/pages/writing/[slug].astro`:

```astro
---
import { getCollection } from "astro:content";
import Layout from "@/layouts/Layout.astro";
import Nav from "@/components/nav.astro";
import Footer from "@/components/footer.astro";
import Breadcrumb from "@/components/breadcrumb.astro";

export async function getStaticPaths() {
  const entries = await getCollection("writing");
  return entries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await entry.render();

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: entry.data.title,
  description: entry.data.description,
  datePublished: entry.data.date,
  author: {
    "@type": "Person",
    name: "Aadil Hassan",
    url: "https://aadilhassan.in",
  },
  publisher: {
    "@type": "Person",
    name: "Aadil Hassan",
  },
};
---

<Layout
  title={`${entry.data.title} — Aadil Hassan`}
  description={entry.data.description}
  structuredData={[articleSchema]}
>
  <Nav />
  <main>
    <div class="border-b border-rule">
      <div class="max-w-content mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-12 md:pb-16">
        <Breadcrumb items={[{ label: "Writing", href: "/writing" }, { label: entry.data.title }]} />

        <h1 class="mt-6 font-display text-3xl sm:text-4xl md:text-5xl leading-[1.1] max-w-3xl">
          {entry.data.title}
        </h1>

        <time
          class="mt-4 block font-mono text-[12px] text-muted"
          datetime={entry.data.date}
        >
          {new Date(entry.data.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </time>
      </div>
    </div>

    <div class="max-w-content mx-auto px-5 md:px-8 py-12 md:py-16">
      <article class="max-w-body prose">
        <Content />
      </article>

      <div class="mt-16 pt-8 border-t border-rule">
        <a
          href="/writing"
          class="font-mono text-sm font-medium text-accent hover:underline underline-offset-4"
        >
          ← All writing
        </a>
      </div>
    </div>
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 3: Verify build**

Run: `pnpm run build`
Expected: Build succeeds. `/writing` page renders with "Coming soon." state.

- [ ] **Step 4: Commit**

```bash
git add src/pages/writing/
git commit -m "feat: writing section — index + post pages with Article schema"
```

---

## Task 10: Build Verification + Final Check

**Files:** None — verification only.

- [ ] **Step 1: Full build**

Run: `pnpm run build`
Expected: Build succeeds with zero errors. All pages generate:
- `/` (home)
- `/work` (work index)
- `/work/dealers-dash`, `/work/marketifyall`, `/work/email-probe`, `/work/voice-call-center`, `/work/rankops`, `/work/realstatevideo` (6 case studies)
- `/writing` (writing index — "Coming soon" state)

- [ ] **Step 2: Start dev server and visually verify**

Run: `pnpm run dev`

Check in browser:
- Home page: hero, proof strip, about, featured work (3 cards), skills, writing preview (hidden if no posts), contact, footer
- `/work`: all 8 projects with case study links for the 6 that have them
- `/work/dealers-dash`: case study renders with breadcrumb, header, full content
- `/writing`: "Coming soon." message
- Mobile: hamburger menu opens/closes, layout is responsive
- No console errors
- Navigation links all work

- [ ] **Step 3: Check structured data**

Run the dev server and inspect the HTML source of:
- Home page: should have `Person`, `WebSite`, `FAQPage` JSON-LD
- `/work/dealers-dash`: should have `Person`, `WebSite`, `SoftwareApplication` JSON-LD
- `/writing`: should have `Person`, `WebSite`, `Blog` JSON-LD

- [ ] **Step 4: Run astro check**

Run: `pnpm run build` (which runs `astro check && astro build`)
Expected: Zero type errors, zero warnings.

- [ ] **Step 5: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: final polish — build verification and responsive check"
```

---

## Summary

| Task | What it produces |
|------|-----------------|
| 1 | Design tokens, Tailwind config, MDX support, content schemas |
| 2 | Base layout with structured data injection |
| 3 | Editorial nav, CSS-only mobile menu, minimal footer |
| 4 | Hero, proof strip, about section |
| 5 | Featured work, skills, writing preview, contact |
| 6 | Home page composition, refined content, cleanup |
| 7 | Work index page |
| 8 | Case study template + 6 project case studies |
| 9 | Writing section (index + post pages) |
| 10 | Build verification and final check |
