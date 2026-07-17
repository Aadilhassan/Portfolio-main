# Portfolio Redesign Spec — Multi-Page Editorial

**Date:** 2026-07-18
**Status:** Approved
**Approach:** Approach 1 — Multi-page editorial portfolio

## Overview

Restructure Aadil Hassan's portfolio from a single-page neo-brutalist site into a multi-page editorial portfolio optimized for hiring managers, recruiters, and AI search engines. Move from loud neo-brutalism to quiet editorial minimalism. Add project case study pages, a curated writing section, and comprehensive SEO/AIO/GEO optimization.

**Primary audience:** Hiring managers and recruiters at funded startups / tech companies evaluating for full-time senior AI/full-stack engineering roles.

**Goals:**
1. Sharpen content — tighter hero, confident tone, scannable structure, impact-driven project descriptions
2. Editorial design — minimal, whitespace-rich, typography-driven, no brutal shadows
3. Add depth — individual project case study pages and curated writing section
4. AIO/GEO/SEO — structured data, semantic HTML, quotable content, FAQ schema

## Information Architecture

### Pages

| Route | Purpose |
|---|---|
| `/` | Home — hero, condensed about, 3 featured projects, skills strip, writing preview, CTA |
| `/work` | Full project grid with filters (all / AI / SaaS / open-source) |
| `/work/[slug]` | Individual project case study page |
| `/writing` | Curated essay listing |
| `/writing/[slug]` | Individual essay page |

### Navigation

- Top nav (fixed, transparent on scroll): `Work` · `Writing` · `About` (anchor on home) · `Contact` + `RÉSUMÉ` button
- Mobile: hamburger → slide-in panel (CSS-only via checkbox hack — no JS)
- Footer: GitHub, LinkedIn, copyright, "Built with Astro. Zero JS. Zero trackers.", back-to-top link

### Content Architecture

- Astro content collections for projects: `src/content/work/*.mdx` with frontmatter
- Astro content collections for writing: `src/content/writing/*.mdx` with frontmatter
- Profile/about data remains in `src/data/site.ts` (shared across pages)
- Static output — zero JS runtime

## Design System

### Color Palette

| Token | Value | Use |
|---|---|---|
| `paper` | `#FAF6EE` | Page background (cream) |
| `ink` | `#1A1A1A` | Primary text |
| `muted` | `#6B675E` | Secondary text, captions |
| `rule` | `#D4D0C8` | Subtle borders, dividers |
| `accent` | `#FF4D00` | Links, highlights, sparingly |
| `sun` | `#FFD02F` | Code highlights, selection, subtle callouts |

Dark mode: not planned. The cream palette is the identity.

### Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Display / headings | Archivo Black | 400/900 | 48–72px hero, 24–32px section |
| Body | Archivo Variable | 400/500 | 16–18px, line-height 1.65 |
| Mono / labels | IBM Plex Mono | 400/500/700 | 12–14px |

These fonts are already loaded. No new font dependencies needed.

### Spacing & Layout

- 4px base unit
- Sections: `py-20 md:py-32`
- Content max-width: `1120px`
- Body text capped at `65ch` for readability
- Generous whitespace between all elements

### Component Patterns

- **Cards**: thin 1px `rule` border, no shadow, subtle background shift (`bg-paper` on slightly darker cream)
- **Buttons**: solid background, no shadows — hover shifts color
- **Links**: accent underline, 2px, offset 4px
- **Tags/chips**: 1px border, `rounded-sm`, mono text
- **Dividers**: thin `rule` lines with generous spacing
- **Selection**: sun yellow background (`::selection { background: #FFD02F }`)

## Home Page (`/`)

### Section 1: Nav
- Fixed top, transparent background that gains `bg-paper` on scroll (CSS only via `position: sticky`)
- Left: `AADIL.HASSAN` in mono, bold
- Right: nav links + résumé CTA button
- Mobile: hamburger → slide-in panel (CSS-only checkbox hack, no JS)

### Section 2: Hero
- Small mono label: `SENIOR SOFTWARE ENGINEER — AVAILABLE FOR WORK`
- Name: `Aadil Hassan` in large display type — confident, not screaming (not all-caps)
- Tagline: *"I build AI-native products end to end — LLM pipelines, voice agents, and full-stack SaaS. Three years in, 10+ shipped, several live with paying users."*
- Two CTAs: `Get in touch` (primary, accent bg) · `View work` (secondary, outlined)
- Location + availability as subtle mono footer line
- No decorative SVGs — clean and direct

### Section 3: Proof Strip
- 4 metrics in a single row: `3+ yrs` · `10+ products` · `170 active users` · `99.9% uptime`
- Thin top/bottom rules, mono labels, generous padding
- Scannable in 2 seconds

### Section 4: About
- Two short paragraphs max, rewritten for confidence and sharpness
- Clean body text, `65ch` measure, no sidebar card
- Brief and punchy — links to full story via scroll or separate section

### Section 5: Featured Work
- 3 hand-picked projects (Dealer's Dash, MarketifyALL, email-probe)
- Each card: number, name, one-line description, key metric, stack tags, `Read case study →` link
- Thin card style, generous padding
- `View all work →` link below → `/work`

### Section 6: Skills
- Condensed single row or compact flow grid
- Highlights only: languages, frameworks, AI/LLM, infra
- Mono tags in a flex-wrap layout — quick to scan, not exhaustive

### Section 7: Writing Preview
- "Writing" section heading
- 2–3 essay cards: title, date, 1-line excerpt, `Read →` link
- `All writing →` link below → `/writing`

### Section 8: Contact / CTA
- Large heading: *"Let's build something that ships."*
- Email as primary CTA (big, clickable, mono)
- GitHub / LinkedIn / Resume links below
- Location + availability note

### Section 9: Footer
- Copyright: `© 2026 Aadil Hassan · Ranchi, India`
- "Built with Astro. Zero JS. Zero trackers."
- Back-to-top link

### Home Page AIO/GEO/SEO
- Hero contains a crisp, quotable definition of who Aadil is
- Proof strip provides AI-extractable metrics
- FAQ schema at bottom (common recruiter questions)
- `Person` + `WebSite` JSON-LD in head (already present, updated)

## Project Case Study Pages (`/work/[slug]`)

### Content Collection

Each project is an MDX file in `src/content/work/`:

```mdx
---
title: "Dealer's Dash"
kind: "AI revenue optimization for auto dealerships"
year: "2024"
stack: ["AWS", "Python", "LLM fine-tuning", "LlamaParse", "NL query"]
featured: true
links:
  - label: "live demo"
    href: "https://..."
description: "Short SEO description for meta tags"
---
```

### Page Layout

**1. Header**
- Breadcrumb: `Work / Dealer's Dash`
- Project name in display type
- One-line description
- Year + stack tags row
- External links (live demo, GitHub, npm)

**2. The Problem**
- Business need, who needed it, what was broken before
- 2–3 paragraphs, concrete and specific

**3. The Approach**
- Architecture decisions, key tradeoffs
- Optional: static architecture diagram (SVG/image)
- Shows thinking, not just doing

**4. Key Decisions**
- 2–4 notable technical decisions with reasoning
- Format: decision → why → outcome
- Example: *"Paired a fine-tuned LLM with a deterministic math engine — LLMs hallucinate arithmetic, so every calculation routes through a deterministic layer. Result: zero math errors in production."*

**5. Results / Impact**
- Metrics with context
- What the numbers mean for business/user

**6. Retrospective**
- What worked, what you'd do differently
- Shows maturity

### Design Treatment
- Body text at `65ch` measure
- Pull quotes in accent color for key metrics
- Code snippets where relevant (syntax-highlighted)
- Thin rule dividers between sections
- Generous whitespace

### Case Studies to Build (6)
1. Dealer's Dash
2. MarketifyALL
3. email-probe
4. AI Voice Call Center
5. RankOps
6. RealStateVideo

Remaining projects (Design Editor, Infollion) appear on `/work` grid without dedicated case study pages initially.

### Project Page AIO/GEO/SEO
- `SoftwareApplication` or `CreativeWork` JSON-LD per project
- Opening paragraph is a standalone quotable summary
- Clear "what / why / how / outcome" structure for AI extraction
- FAQ schema per project

## Work Index Page (`/work`)

- All projects in a grid/list
- Optional filter pills: `All` · `AI` · `SaaS` · `Open Source` (CSS-only filtering via anchor links or simple JS-free tag grouping)
- Each card: number, name, kind, one-line description, stack tags
- Featured projects link to case study pages; others show expanded description inline

## Writing Section

### Writing Index (`/writing`)
- List of curated essays
- Each: title, date, 1-line excerpt, `Read →` link
- Sorted by date, newest first

### Writing Post (`/writing/[slug]`)
- Content collection in `src/content/writing/*.mdx`
- Title, date, reading time estimate
- Body: MDX with full Markdown support
- Clean editorial layout — same typography system as project pages
- Back link: `← All writing`

### Initial Writing Content
- 2–3 essays to start (content to be written separately, structure built first)
- Placeholder essays or "Coming soon" state acceptable for initial launch

### Writing Page AIO/GEO/SEO
- `Article` JSON-LD per post
- `Blog` JSON-LD on index
- Proper `<time>` elements with `datetime` attribute
- Open Graph tags per post

## AIO/GEO/SEO Strategy (Cross-Cutting)

### Structured Data (JSON-LD)
- `Person` — on every page (already exists, refined)
- `WebSite` — on every page (already exists, refined)
- `SoftwareApplication` / `CreativeWork` — per project page
- `Article` — per writing post
- `FAQPage` — on home page and project pages
- `BreadcrumbList` — on project and writing pages

### Semantic HTML
- Proper heading hierarchy (single `h1` per page, nested `h2`/`h3`)
- `<article>`, `<section>`, `<nav>`, `<main>`, `<aside>`, `<time>` used correctly
- `aria-label` on all interactive elements
- `alt` text on all images

### Quotable Content
- Each page has a clear, extractable summary in the first paragraph
- Definition-style statements: "Aadil Hassan is a senior software engineer who..."
- Project pages open with standalone summaries an LLM would cite
- Metrics are specific and contextual (not just numbers)

### Internal Linking
- Home → project case studies (3+ links)
- Home → writing (2+ links)
- Project pages → related projects
- Writing posts → relevant projects
- All pages → contact

### Technical SEO
- Sitemap expanded for all new pages (already configured)
- Canonical URLs on every page
- Open Graph + Twitter Card on every page
- Robots meta on every page
- `hreflang` not needed (English only)

### AIO/GEO Specific
- FAQ schema with questions recruiters actually ask
- Entity clarity: each page clearly defines "what this is"
- Content formatted for extraction: clear sections, labeled data, structured lists
- Avoid ambiguity — specific claims with specific evidence

## Technical Implementation

### Tech Stack
- Astro 5 (already in use)
- Tailwind CSS 3 (already in use)
- Astro content collections for projects and writing
- Static output (`output: 'static'`)
- No client JS beyond what Astro provides

### File Structure Changes
```
src/
├── content/
│   ├── work/           # Project case study MDX files
│   │   ├── config.ts   # Content collection schema
│   │   ├── dealers-dash.mdx
│   │   ├── marketifyall.mdx
│   │   ├── email-probe.mdx
│   │   ├── voice-call-center.mdx
│   │   ├── rankops.mdx
│   │   └── realstatevideo.mdx
│   └── writing/        # Writing MDX files
│       ├── config.ts   # Content collection schema
│       └── (placeholder posts)
├── components/
│   ├── (existing components — redesigned)
│   └── (new components for case studies, writing)
├── layouts/
│   ├── Layout.astro    # Base layout (updated design system)
│   └── (new layouts if needed)
├── pages/
│   ├── index.astro     # Redesigned home
│   ├── work/
│   │   ├── index.astro # Work grid
│   │   └── [slug].astro # Case study pages
│   └── writing/
│       ├── index.astro # Writing listing
│       └── [slug].astro # Individual posts
└── data/
    └── site.ts         # Profile/about data (refined)
```

### Migration Notes
- Project data migrates from `site.ts` arrays to content collection MDX files
- About/profile data stays in `site.ts` (shared, not per-page)
- Existing SVG components: keep only if they fit the new editorial aesthetic; otherwise remove
- Tailwind config updated with new tokens (`rule` color added, shadows simplified)
- Global styles simplified (remove brutal scrollbar styling, keep selection color)

## Build Order

1. Design system foundation (Tailwind config, global styles, base layout)
2. Home page (all sections)
3. Work index page
4. Project case study pages (start with Dealer's Dash as template)
5. Writing section (structure + placeholder)
6. Content migration (site.ts → content collections)
7. AIO/GEO/SEO (structured data, FAQ schema, meta tags on all pages)
8. Responsive pass (mobile nav, all breakpoints)
9. Final review and polish
