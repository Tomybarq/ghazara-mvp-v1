# Ghazara — Development Roadmap

> Official phase tracking document for the Ghazara Trading & Marketing digital ecosystem.

## Phase Status

| Phase | Description | Status | Notes |
|:---|:---|:---:|:---|
| **Phase 0** | Content Truth & Approval | ✅ Done | ContentApproval governance matrix applied |
| **Phase 1** | Route Integrity & IA | ✅ Done | Navigation SSOT, RFQ/Contact separation |
| **Phase 2** | Institutional Homepage | ✅ Done | Clarity → Trust → Value → Proof → Action |
| **Phase 3** | Brand & Favicon Polish | ✅ Done | SVG logo, high-contrast glass header card |
| **Phase 4** | Performance & Caching | ✅ Done | QueryClient defaults, mutation protection |
| **Phase 5** | Reliability & Test Hardening | ✅ Done | 41 tests / 8 suites (tRPC, DB, Cookies) |
| **Phase 6** | Production Readiness | ✅ Done | Zero-PII analytics, Vercel SOPs, SEO |
| **Phase 7A** | Detail Content & Route Foundation | ✅ Done | /products/:slug, /projects/:slug — 54 tests |
| **Phase 7B** | Scope Discovery & Lead Lifecycle | ⏳ Upcoming | RFQ estimator, reference codes, CRM fields |

---

## What "Done" Means for Each Phase

A phase is complete when:
1. pnpm check exits 0 (zero TypeScript errors)
2. pnpm test passes all tests (currently 54/54)
3. pnpm build produces a clean production bundle
4. Changes are committed and pushed to the branch

---

## Verification Commands

`ash
pnpm install       # Install dependencies
pnpm check         # TypeScript strict check
pnpm test          # Vitest test suite
pnpm build         # Production bundle
pnpm run build:vercel  # Vercel-specific build
pnpm dev           # Local dev server
`

---

See individual phase files in phases/ for detailed acceptance criteria.
