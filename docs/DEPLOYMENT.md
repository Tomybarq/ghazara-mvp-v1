# Vercel Deployment Notes & Production Runbook

## Purpose

This project is a high-performance bilingual SPA (React 19 + Tailwind v4) backed by an Express and tRPC serverless bridge. The Vercel bridge exports the Express application from `api/index.ts`, while `vercel.json` handles the Vite static build and routes API (`/api/trpc`), OAuth (`/api/oauth`), storage, and deep SPA client paths.

---

## 1. Required Environment Configuration

Configure the following environment variables in **Vercel Project Settings > Environment Variables** for both **Preview** and **Production** environments. Never commit credentials to Git.

| Variable | Target | Purpose | Notes |
|---|---|---|---|
| `DATABASE_URL` | Server | MySQL/TiDB database connection string for RFQ leads and user records | Must be accessible from serverless functions (SSL enabled). |
| `JWT_SECRET` | Server | Secret used for cryptographic signing of session cookies | Generate a high-entropy string (e.g. `openssl rand -hex 32`). |
| `VITE_APP_ID` | Client & Server | Manus OAuth application identifier | Required if OAuth portal sign-in is retained. |
| `OAUTH_SERVER_URL` | Server | Manus OAuth backend authorization endpoint | Required while retaining Manus OAuth. |
| `OWNER_OPEN_ID` | Server | Administrative user identifier | Grants owner/admin privileges upon sign-in. |
| `BUILT_IN_FORGE_API_URL` | Server | Server-side asset storage endpoint | Provisioned outside the repository. |
| `BUILT_IN_FORGE_API_KEY` | Server | Server-side storage authentication token | Provisioned outside the repository. |
| `VITE_OAUTH_PORTAL_URL` | Client | Client OAuth entrypoint | Browser-visible authentication redirect. |

---

## 2. Database Migration & Deployment SOP

1. **Pre-Deployment Backup:**
   Before running any schema migrations on the staging/production database, generate a complete database dump:
   ```bash
   mysqldump -h <HOST> -u <USER> -p <DATABASE_NAME> > backup_pre_phase6.sql
   ```

2. **Schema Verification & Generation:**
   ```bash
   pnpm drizzle-kit generate
   ```

3. **Deploy to Preview First:**
   - Link the GitHub branch to a Vercel Preview Deployment.
   - Run the smoke test suite against the Preview URL (see Checklist below).

4. **Promote to Production:**
   - Verify zero errors in Vercel logs.
   - Promote Preview to Production.

---

## 3. Rollback & Disaster Recovery Runbook

If a critical issue occurs after deployment:

1. **Immediate Frontend/Server Rollback:**
   - In Vercel Dashboard, navigate to **Deployments**.
   - Locate the previous stable deployment and click **Instant Rollback (Promote to Production)**.

2. **Database Rollback (if schema changed):**
   - Restore the pre-deployment database dump:
     ```bash
     mysql -h <HOST> -u <USER> -p <DATABASE_NAME> < backup_pre_phase6.sql
     ```

---

## 4. Production Smoke Test Checklist

- [ ] **Health Check:** `GET https://<domain>/api/trpc/system.health` returns status `200` with `healthy: true`.
- [ ] **RFQ Submission:** Submit a test quote from `/request-quote`. Verify it is stored and that WhatsApp direct link opens with proper UTF-8 encoded text.
- [ ] **Bilingual Switcher:** Toggle Arabic/English across `/`, `/services`, `/products`, `/projects`, `/blog`, `/contact`. Verify `dir="rtl"` / `dir="ltr"` and meta tags update correctly.
- [ ] **SPA Deep Routing:** Refresh `/services`, `/about`, `/contact`, `/request-quote` directly; verify Vercel rewrites serve `index.html` without 404s.
- [ ] **404 Handling:** Visit `https://<domain>/non-existent-route` and ensure institutional NotFound page renders with `noindex, nofollow`.

---

## Sources

- [Vite on Vercel Documentation](https://vercel.com/docs/frameworks/frontend/vite)
- [Express Serverless on Vercel](https://vercel.com/docs/frameworks/backend/express)
- [Vercel Environment Variables Guide](https://vercel.com/docs/environment-variables)
