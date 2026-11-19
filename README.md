<div align="center">

![Ghazara Logo](/C:/Users/HP/.gemini/antigravity/brain/640f7093-8fb3-43dc-af25-d45d7488cf4f/ghazara-logo.png)

# 🌐 غزارة للتجارة والتسويق — Ghazara Commerce & Marketing

### *منصة رقمية متكاملة للتجارة والتسويق في المملكة العربية السعودية*
### *A Full-Stack Arabic-First B2B Commerce & Marketing Platform*

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge&logo=google-cloud)](https://cloud.google.com)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![tRPC](https://img.shields.io/badge/tRPC-v11-2596BE?style=for-the-badge&logo=trpc&logoColor=white)](https://trpc.io)
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.44-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)](https://orm.drizzle.team)
[![Docker](https://img.shields.io/badge/Docker-Multi--Stage-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
[![RTL Supported](https://img.shields.io/badge/RTL-Arabic_Supported-green?style=for-the-badge)](https://ghazara.net)
[![Platform](https://img.shields.io/badge/Deploy-Google_Cloud_Run-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://ghazara.net)

**🌍 Live:** [https://ghazara.net](https://ghazara.net)

</div>

---

## 📋 نظرة عامة | Overview

**غزارة للتجارة والتسويق** is a modern, full-stack B2B digital platform purpose-built for the Saudi Arabian commerce and marketing ecosystem. It bridges the gap between businesses seeking specialized trade and marketing services and a trusted, regionally focused provider — delivering a seamless Arabic-first digital experience.

The platform addresses a critical pain point in the MENA B2B market: the absence of a professional, fully Arabic-localized web presence for trade and marketing service providers. Ghazara solves this with a polished, production-grade web application that supports RFQ (Request for Quotation) submission, multi-sector service discovery, and an integrated admin dashboard — all running natively in Arabic with RTL layout support.

Built on a modern type-safe stack (React 19 · tRPC v11 · Drizzle ORM · MySQL 8), the platform is containerized via Docker and deployed automatically to **Google Cloud Run** (region: `me-central1`) through a **Google Cloud Build** CI/CD pipeline, ensuring zero-downtime releases, horizontal auto-scaling up to 10 instances, and sub-second cold-start optimizations.

---

## ✨ المميزات الرئيسية | Key Features

### 🔐 Auth & Security — الأمان والمصادقة
| Feature | Details |
|---|---|
| 🔑 JWT Session Auth | Cookie-based sessions signed with `jose` for stateless, secure authentication |
| 👤 Role-Based Access | Two-tier RBAC: `admin` (owner) and `user` — enforced at the ORM and tRPC router layer |
| 🛡️ Owner Bootstrapping | The first user matching `OWNER_OPEN_ID` is automatically promoted to `admin` on sign-in |
| 🍪 Secure Cookies | `HttpOnly`, `SameSite`, `Secure` flags + environment-aware domain scoping |
| 🔒 Input Validation | End-to-end Zod schema validation on all tRPC procedures — no raw input reaches the DB |

### 🏢 Multi-Sector Service Discovery — اكتشاف القطاعات
| Feature | Details |
|---|---|
| 🏭 Sector Cards | Modular `SectorCard` components across Industries, Agriculture, Retail, and more |
| 🛠️ Service Bento Grid | Visually rich Bento-style grid layout for marketing & trade service categories |
| 🔍 SEO-Optimized Pages | Per-page `<SEOHead>` component with Open Graph, canonical URLs, and Arabic meta content |
| 🌐 Google Maps Integration | Embedded location map (`@types/google.maps`) for regional presence display |

### 📋 RFQ System — نظام طلب عروض الأسعار
| Feature | Details |
|---|---|
| 📝 Smart RFQ Form | Multi-step, validated RFQ form with sector/service/region dropdowns + notes field |
| 💾 Persistent Storage | RFQ requests stored in `rfqRequests` MySQL table via Drizzle ORM with status tracking |
| ⚡ Type-Safe API | Zod-validated tRPC `rfq.submit` mutation — runtime type safety from client to DB |
| 🔔 Instant Feedback | Toast notifications via `sonner` on success/error with optimistic UI |

### 📊 Admin Dashboard — لوحة الإدارة
| Feature | Details |
|---|---|
| 📈 GitHub Activity | Live GitHub commit feed from the private `ghazara-mvp-v1` repo via GitHub REST API |
| 📊 Analytics Charts | Recharts-powered data visualization for activity metrics |
| 🔄 Auto-refresh | TanStack Query with smart cache invalidation and retry logic |
| 🚦 Connection Status | Real-time dashboard health card with retry button on GitHub API failures |

### 🎨 UI/UX & RTL Design — التصميم والتجربة
| Feature | Details |
|---|---|
| 🌙 Dark / Light Mode | `next-themes` provider with system preference detection and manual toggle |
| 📱 Fully Responsive | Mobile-first Tailwind CSS v4 layout supporting all viewport sizes |
| 🌍 Arabic / RTL Native | `dir="rtl"` support with mirrored layout logic and Arabic-first content |
| ✨ Smooth Animations | Framer Motion page transitions, micro-interactions, and hover effects |
| 🤖 AI Chat Box | Integrated `AIChatBox` component for conversational user assistance |
| 💬 WhatsApp Widget | Floating WhatsApp CTA widget for direct business communication |

### ⚙️ DevOps & Infrastructure — البنية التحتية
| Feature | Details |
|---|---|
| 🐳 Multi-Stage Docker | Optimized `node:20-alpine` builder + minimal production runner (< 150MB image) |
| ☁️ Google Cloud Run | Auto-scaling serverless deployment in `me-central1` with 80 concurrent requests/instance |
| 🔁 Cloud Build CI/CD | Automated build → test → push → deploy pipeline on every `git push` |
| 🧪 Vitest Test Suite | Unit and integration tests covering auth, RFQ, cookies, navigation, and DB operations |

---

## 🏗️ Tech Stack & Architecture — المكدس التقني

### Stack Table

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Frontend Runtime** | React | 19 | UI component tree |
| **Frontend Framework** | Vite | 7 | Dev server, HMR, production bundling |
| **Routing** | Wouter | 3.3 | Lightweight client-side SPA routing |
| **Language** | TypeScript | 5.9 | Full type safety across client/server |
| **API Layer** | tRPC v11 | 11.6 | End-to-end type-safe RPC procedures |
| **Data Fetching** | TanStack Query | 5 | Server state caching & synchronization |
| **ORM** | Drizzle ORM | 0.44 | Type-safe MySQL query builder |
| **Database** | MySQL | 8 | Relational persistence (users, RFQ) |
| **Backend** | Express | 4 | HTTP server + tRPC adapter |
| **Styling** | Tailwind CSS | v4 | Utility-first CSS with RTL support |
| **UI Components** | Radix UI + shadcn/ui | — | Accessible, unstyled primitive components |
| **Animations** | Framer Motion | 12 | Declarative animation library |
| **Charts** | Recharts | 2 | Composable charting for dashboard |
| **Validation** | Zod | 4 | Schema validation (client + server) |
| **Auth** | jose (JWT) | 6 | JWT signing & cookie session management |
| **Containerization** | Docker | Multi-stage | Production image build & runtime |
| **CI/CD** | Google Cloud Build | — | Automated build → push → deploy pipeline |
| **Hosting** | Google Cloud Run | — | Serverless container hosting (`me-central1`) |
| **Testing** | Vitest | 2 | Unit + integration test runner |
| **Package Manager** | pnpm | 10.15.1 | Fast, disk-efficient dependency management |

### System Architecture Diagram — مخطط البنية

```mermaid
flowchart TD
    A["🌍 User Browser\n(Arabic RTL)"] -->|HTTPS| B["🌐 Google Cloud Run\nghazara.net\nme-central1"]

    subgraph Container ["🐳 Docker Container (node:20-alpine)"]
        B --> C["⚡ Express Server\nserver/_core/index.ts"]
        C --> D["📡 tRPC Router\n/api/trpc/*"]
        C --> E["🎨 Vite Static Assets\ndist/public/*"]

        D --> F["🔐 Auth Router\nJWT · Cookie Sessions"]
        D --> G["📋 RFQ Router\nZod Validated"]
        D --> H["📊 GitHub Router\nActivity Feed"]
        D --> I["⚙️ System Router\nHealth · Config"]

        F --> J["🗄️ Drizzle ORM\nMySQL 8"]
        G --> J
        J --> K[("💾 MySQL Database\nusers · rfqRequests")]
    end

    H --> L["🐙 GitHub REST API\nprivate repo activity"]
    E --> M["⚛️ React 19 SPA\nWouter · TanStack Query"]
    M --> D

    subgraph CI["☁️ Google Cloud Build CI/CD"]
        N["📦 git push"] --> O["🔨 Docker Build\nMulti-Stage"]
        O --> P["📤 Push to GCR\ngcr.io/PROJECT/ghazara"]
        P --> Q["🚀 Deploy to Cloud Run\nZero Downtime"]
    end

    style Container fill:#1e293b,stroke:#3b82f6,color:#f8fafc
    style CI fill:#14532d,stroke:#22c55e,color:#f8fafc
```

---

## 🚀 Getting Started — البدء السريع

### Prerequisites — المتطلبات الأساسية

| Requirement | Minimum Version | Installation |
|---|---|---|
| **Node.js** | 20 LTS | [nodejs.org](https://nodejs.org) |
| **pnpm** | 10.15.1 | `npm install -g pnpm` or via `corepack enable` |
| **MySQL** | 8.0 | [mysql.com](https://www.mysql.com) or Docker |
| **Git** | Any | [git-scm.com](https://git-scm.com) |
| **Docker** _(optional)_ | 24+ | Required only for containerized local dev |

> [!NOTE]
> pnpm is **required** — this project uses pnpm workspaces and a lockfile that is incompatible with npm or yarn. Run `corepack enable` after installing Node.js to activate it automatically.

### 1. Clone the repository

```bash
git clone https://github.com/Tomybarq/ghazara-mvp-v1.git
cd ghazara-mvp-v1
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
# Edit .env with your actual values
```

### 4. Start MySQL (Docker)

```bash
docker run --name ghazara-mysql \
  -e MYSQL_DATABASE=ghazara \
  -e MYSQL_USER=ghazara \
  -e MYSQL_PASSWORD=ghazara_pw \
  -e MYSQL_ROOT_PASSWORD=root \
  -p 3306:3306 -d mysql:8
```

### 5. Run database migrations

```bash
pnpm db:push
```

### 6. Start development server

```bash
pnpm dev
# Open http://localhost:3000
```

---

## 🔑 Environment Variables — المتغيرات البيئية

```dotenv
NODE_ENV=development
PORT=3000
DATABASE_URL=mysql://ghazara:ghazara_pw@localhost:3306/ghazara
JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters_long
GITHUB_TOKEN=ghp_your_github_personal_access_token
ACTIVITY_SUMMARY_RUN_HOUR=8
ACTIVITY_SUMMARY_RECIPIENT=info@ghazara.net
OAUTH_SERVER_URL=
OWNER_OPEN_ID=your_owner_open_id
VITE_APP_ID=ghazara-v2
VITE_OAUTH_PORTAL_URL=
```

> [!CAUTION]
> Never commit `.env` to source control. Use Google Cloud Secret Manager for production secrets.

---

## 🔐 Security & RBAC — الأمان والصلاحيات

| Role | Access | Assignment |
|---|---|---|
| `admin` | Full dashboard + all procedures | Auto-bootstrapped for `OWNER_OPEN_ID` |
| `user` | Authenticated pages + profile | Default on first sign-in |
| _guest_ | Public pages + RFQ submission | No token required |

---

## 📜 Scripts — الأوامر

| Command | Description |
|---|---|
| `pnpm dev` | Development server with live reload |
| `pnpm build` | Production bundle (Vite client + esbuild server) |
| `pnpm start` | Run production build |
| `pnpm check` | TypeScript type-check |
| `pnpm test` | Vitest test suite |
| `pnpm format` | Prettier format all files |
| `pnpm db:push` | Generate + apply Drizzle migrations |

---

## 🚀 Deployment — النشر

**Google Cloud Run (default):** Automated via `cloudbuild.yaml` on push to `main`.

```bash
# Manual trigger
gcloud builds submit --config=cloudbuild.yaml .
```

**Docker:**
```bash
docker build -t ghazara-website .
docker run -p 8080:8080 -e DATABASE_URL="..." -e JWT_SECRET="..." ghazara-website
```

**Docker Compose (full local stack):**
```bash
docker compose -f docker-compose.base44.yml up -d
```

---

## 📄 License — الترخيص

MIT License — Copyright (c) 2024–2026 **غزارة للتجارة والتسويق — Ghazara Commerce & Marketing**

---

<div align="center">

**غزارة للتجارة والتسويق** · Built with ❤️ in Saudi Arabia 🇸🇦

[![Website](https://img.shields.io/badge/🌐_Visit-ghazara.net-6366f1?style=for-the-badge)](https://ghazara.net)

</div>
