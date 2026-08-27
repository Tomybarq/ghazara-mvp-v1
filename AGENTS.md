# Base44 dev environment notes

- Single Node process serves BOTH the API (Express + tRPC) and the client (Vite middleware mode) on port 3000. There is no separate frontend service.
- `server/_core/vite.ts` already sets `allowedHosts: true`, so the preview hostname works with no config change.
- Run: `docker compose -f docker-compose.base44.yml up -d` (app + MySQL 8). `tsx watch` gives live reload for server code, Vite HMR for client code.
- DB is MySQL 8 (schema targets MySQL/TiDB). Migrations: `pnpm db:push` (drizzle-kit generate + migrate) — run automatically on container start.
- `.env.base44-defaults` holds harmless dev placeholders; real secrets come from `/run/base44/app.env` (loaded last, so it wins).
- The app boots fine without OAuth/Forge credentials: it logs `[OAuth] ERROR: OAUTH_SERVER_URL is not configured` and all public pages still work. Only login-related routes need it.
- `pnpm install` warns about ignored build scripts (@tailwindcss/oxide, esbuild); harmless, the app builds and runs.
- Tests: `docker compose -f docker-compose.base44.yml exec app pnpm test`; typecheck: `pnpm check`.
