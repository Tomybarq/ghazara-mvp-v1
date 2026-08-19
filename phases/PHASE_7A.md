# Phase 7A — Approved Detail Content & Route Foundation

**Status:** ✅ Complete
**Commit:** 583e199 (Phase 6+7A combined)
**Tests on completion:** 54 tests / 9 suites

## What Was Done

### Content Governance
- data/governance/contentApproval.ts — ContentApprovalStatus, isApproved, isPubliclyPublishable
- data/governance/detailRoutes.ts — normalizeSlug, resolvePublishedProduct, resolvePublishedProject, buildContextualRfqUrl
- All catalog records set to pproval.status = "draft" and published: false pending written sign-off

### Dynamic Detail Routes
- pages/ProductDetailPage.tsx — bilingual, breadcrumbs, RFQ CTA
- pages/ProjectDetailPage.tsx — bilingual, breadcrumbs, RFQ CTA
- Routes /products/:slug and /projects/:slug registered in App.tsx

### Collection Page Protection
- ProductsPage.tsx and ProjectsPage.tsx filter by isPubliclyPublishable
- Safe empty state shown when all records are draft

### RFQ & SEO
- RFQForm validates ?product= and ?project= against published catalog only
- Sitemap limited to top-level published URLs only

## Content Safety Rule (PERMANENT)

`
Do NOT change any record to:
  approval.status = "approved"
  published = true
without written sign-off from Ghazara management for that exact record,
its Arabic copy, English copy, claims, and any case-study outcomes.
`

## Acceptance Criteria (all met)

- [x] Draft records → NotFound on detail URL
- [x] Draft records excluded from collection pages
- [x] Draft slugs excluded from sitemap.xml
- [x] RFQForm validates slugs against published catalog
- [x] pnpm check → 0 errors
- [x] pnpm test → 54/54 passing
- [x] pnpm build → clean bundle, 0 circular dependency warnings
