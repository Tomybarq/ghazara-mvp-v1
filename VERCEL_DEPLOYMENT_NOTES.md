# Vercel Deployment & Production Operations Guide | Ghazara V2

## Overview

This project is a modern TypeScript stack with a Vite SPA frontend backed by Express, tRPC, and Drizzle ORM.
On Vercel:
- `api/index.ts` acts as the Serverless Function entry point exporting the Express application.
- `vercel.json` coordinates client asset delivery, serverless API rewrites (`/api/*`), and deep SPA client-side routing (`/*` -> `/index.html`).

---

## 🌐 Custom Domain Configuration (Hostinger DNS Setup)

To point your custom domain `ghazara.net` from Hostinger to Vercel without interrupting email services:

### 1. In Vercel Dashboard:
1. Go to **Project Settings** > **Domains**.
2. Add `ghazara.net` (recommended as canonical).
3. Add `www.ghazara.net` (configured to redirect to `ghazara.net`).

### 2. In Hostinger hPanel (DNS / Nameservers):
Add or update the following DNS records:

| Record Type | Name / Host | Points to / Value | TTL | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` | `76.76.21.21` | Auto / 300 | Vercel Global Anycast IP |
| **CNAME** | `www` | `cname.vercel-dns.com.` | Auto / 300 | Vercel Edge CNAME |

> **Notice regarding Business Email (`info@ghazara.net`):**
> Using the A/CNAME record method preserves all existing Hostinger MX and SPF/DKIM mail records intact.

---

## 🔑 Required Production Environment Variables

Set these in your **Vercel Project Dashboard** under **Settings** > **Environment Variables**:

| Variable | Description | Example / Note |
|---|---|---|
| `DATABASE_URL` | MySQL / TiDB cloud connection string | `mysql://user:pass@host:3306/ghazara?ssl={"rejectUnauthorized":true}` |
| `JWT_SECRET` | Secret key used for cryptographic session signing | Secure 32+ character string |
| `GITHUB_TOKEN` | Access token for GitHub activity dashboard widget | Fine-grained or classic token with repo read scope |
| `NODE_ENV` | Runtime environment mode | `production` |
| `ACTIVITY_SUMMARY_RECIPIENT` | Corporate notification recipient | `info@ghazara.net` |

---

## 🧪 Production Verification & Build Commands

```bash
# 1. Type-check all TypeScript code:
pnpm check

# 2. Run automated test suite (40+ unit tests):
pnpm test

# 3. Build client and server bundles:
pnpm build

# 4. Build Vercel client bundle:
pnpm run build:vercel
```
