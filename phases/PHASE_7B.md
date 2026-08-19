# Phase 7B — Scope Discovery Assistant & Lead Lifecycle

**Status:** ⏳ Upcoming (not started)

## Objective

Build a guided quotation flow and lead management foundation that converts the RFQ form into a structured, trackable business process.

## Features to Build

### 1. Scope Discovery Assistant
- Multi-step guided form that asks about project type, scale, timeline, and budget range
- Produces a structured "Scope Brief" summary visible to both client and Ghazara team
- Replaces the free-text 
otes field with structured fields

### 2. RFQ Reference Codes
- Auto-generate unique reference codes: GHZ-YYYY-XXXX
- Store in database with timestamp, sector, service, and scope brief
- Display to user after submission for tracking

### 3. Lead Lifecycle Fields
- Add status field to RFQ records: 
ew | reviewed | quoted | won | lost
- Add ssignedTo, ollowUpAt, 
otes (internal) fields
- Internal-only — not exposed to frontend

### 4. Admin/Review Hook (optional)
- Simple protected route for reviewing submitted RFQs
- Filter by status, sector, region

## Acceptance Criteria (TBD)

- [ ] Scope Discovery flow completes without error
- [ ] RFQ reference code generated and stored
- [ ] Reference code displayed to user post-submission
- [ ] Lead status field persisted in DB
- [ ] pnpm check → 0 errors
- [ ] pnpm test → all passing (+ new 7B tests)
- [ ] pnpm build → clean bundle

## Dependencies

- Phase 7A must be complete ✅
- Ghazara management approval on scope categories and pricing tiers
