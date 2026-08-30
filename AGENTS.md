# Base44 Dev Environment Notes

## Stack
- Node 22 + Vite (client) + Express + tRPC (server), TypeScript, Tailwind.
- MySQL 8 (`ghazara` db, user `ghazara` / `ghazara_pw`).
- Dev command: `NODE_ENV=development tsx watch server/_core/index.ts` (live reload for server); Vite dev server handles the client with HMR.
- Package manager: pnpm 10.15.1 (enabled via corepack in the compose command).

## Running the app
- `docker compose -f docker-compose.base44.yml up -d` — starts `db` (MySQL) and `app` (bind-mounts the repo at `/app`, installs deps, runs drizzle migrations via `pnpm db:push`, then `pnpm dev`).
- Web entry: host port 3000. Health: `GET /`.
- The app serves on the external preview host (Vite `allowedHosts` already permits the preview origin).

## Secrets (platform-managed, /run/base44/app.env — wired LAST in compose)
- `GITHUB_TOKEN` — GitHub access token used by the `/dashboard` GitHub activity page (`server/_core/githubRouter.ts`). The repo `Tomybarq/ghazara-mvp-v1` is **private**, so the token must have access to it. A classic token with `repo` scope, or a fine-grained token with the repo selected + `Contents: read` + `Metadata: read`, works.

## GitHub dashboard feature
- Route `/dashboard` (`client/src/pages/Dashboard.tsx`) renders `GitHubActivity` (`client/src/components/dashboard/GitHubActivity.tsx`) inside `DashboardLayout` with `requireAuth={false}` (OAuth/`OAUTH_SERVER_URL` is not configured in this environment, so the auth gate would otherwise block the page).
- Data comes from the tRPC `github.overview` / `github.commits` procedures (`server/_core/githubRouter.ts`, wired in `server/routers.ts`).
- If the token can't access the repo, the dashboard shows a "Couldn't connect to GitHub" card with a retry button instead of the data.

## Auth note
- `OAUTH_SERVER_URL` is empty in this dev environment, so `auth.me` returns `null`. The dashboard bypasses the gate via `requireAuth={false}`; other uses of `DashboardLayout` keep the default `requireAuth={true}`.

## Verify
- `docker exec app-app-1 npx tsc --noEmit` — type-check.
- `curl -s "http://localhost:3000/api/trpc/github.overview?batch=1&input=%7B%220%22%3A%7B%22json%22%3Anull%7D%7D"` — GitHub router response (look for `connected:true`).
- `pnpm test` — unit tests.
