# Vercel Deployment Notes

## Purpose

This project is a Vite SPA backed by Express and tRPC. The Vercel bridge exports the Express application from `api/index.ts`, while `vercel.json` handles the Vite build and routes API, OAuth, storage, and deep SPA paths appropriately.

## Required production configuration

Set every server-side value in Vercel Project Settings for both Preview and Production. Do not commit values to the repository.

| Variable | Purpose | Migration status |
|---|---|---|
| `DATABASE_URL` | MySQL connection for RFQ requests and user records | A Vercel-reachable MySQL/TiDB service is required. |
| `JWT_SECRET` | Session-cookie signing | Generate a dedicated production secret. |
| `VITE_APP_ID` | Manus OAuth application identifier | Requires a valid callback configuration for the Vercel domain. |
| `OAUTH_SERVER_URL` | Manus OAuth backend endpoint | Required while retaining Manus OAuth. |
| `OWNER_OPEN_ID` | Owner role mapping | Required when admin sign-in is retained. |
| `BUILT_IN_FORGE_API_URL` | Manus storage API endpoint | Required only while retaining Manus storage proxy. |
| `BUILT_IN_FORGE_API_KEY` | Server-side Manus storage credential | Must be provisioned outside the source repository. |
| `VITE_OAUTH_PORTAL_URL` | Browser OAuth entrypoint | Required if protected user flows are enabled. |
| `VITE_FRONTEND_FORGE_API_URL` | Frontend Forge endpoint | Required only for frontend Manus integrations. |
| `VITE_FRONTEND_FORGE_API_KEY` | Frontend Forge access credential | Assess exposure before use in public client code. |

## Important limitation

The values injected by Manus for its managed runtime are not automatically available to a Vercel project. A production deployment should not be promoted until each active backend dependency has an independently managed Vercel-compatible credential and data service.

## Sources

- [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite)
- [Express on Vercel](https://vercel.com/docs/frameworks/backend/express)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [Vercel Project Configuration](https://vercel.com/docs/project-configuration)
