# Ghazara — Architecture Overview

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Vite 7, Tailwind CSS 4, Wouter |
| **State & Data** | TanStack Query, tRPC Client v11, Bilingual LanguageProvider |
| **Backend** | Node.js, Express 4, tRPC Server v11 |
| **Database** | MySQL 8 / TiDB, Drizzle ORM |
| **Deploy** | Vercel (Serverless Functions + Static SPA) |

## Directory Structure

`
ghazara-mvp-v1/
├── docs/                    # Permanent reference docs
│   ├── ARCHITECTURE.md      # This file
│   ├── GOVERNANCE.md        # Content approval governance
│   ├── DEPLOYMENT.md        # Vercel deployment guide
│   └── IDEAS.md             # Future architectural ideas
│
├── phases/                  # Phase-by-phase development map
│   ├── ROADMAP.md           # Full phase roadmap
│   ├── PHASE_6.md           # Phase 6 summary & acceptance criteria
│   ├── PHASE_7A.md          # Phase 7A summary & acceptance criteria
│   └── PHASE_7B.md          # Phase 7B definition (upcoming)
│
├── client/src/
│   ├── data/
│   │   ├── catalog/         # Business catalog data (changes with content)
│   │   │   ├── products.ts
│   │   │   ├── projects.ts
│   │   │   ├── services.ts
│   │   │   ├── blog.ts
│   │   │   └── index.ts
│   │   ├── governance/      # Content governance rules (changes with policy)
│   │   │   ├── contentApproval.ts
│   │   │   ├── detailRoutes.ts
│   │   │   └── index.ts
│   │   └── site/            # Static site config (company SSOT)
│   │       ├── company.ts
│   │       ├── contact.ts
│   │       ├── navigation.ts
│   │       ├── seo.ts
│   │       ├── content.ts
│   │       └── index.ts
│   ├── pages/               # Route-level page components
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utilities (analytics, trpc)
│   ├── contexts/            # React contexts
│   └── hooks/               # Custom React hooks
│
├── server/                  # Node.js API (tRPC, Express)
└── shared/                  # Shared types (client & server)
`

## Data Flow

`
User Request
    ↓
Wouter Router (App.tsx)
    ↓
Page Component (pages/)
    ↓
data/governance/ — isPubliclyPublishable() check
    ↓
data/catalog/ — product/project records
    ↓
Render or → NotFound (if draft)
`

## Key Governance Rule

All catalog records must have:
`	ypescript
approval.status === "approved" && published === true
`
before they appear in public routes, collections, or sitemaps.
