# ==============================================================================
# Production Multi-Stage Dockerfile for Ghazara (Google Cloud Run & Cloud Build)
# ==============================================================================

# --- Stage 1: Build & Bundle ---
FROM node:20-alpine AS builder

WORKDIR /app

# Enable and configure pnpm matching repository packageManager
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

# Copy dependency specifications and patches
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches

# Install all dependencies (including devDependencies required for build)
RUN pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Build Vite client assets (dist/public) and esbuild server runtime (dist/index.js)
RUN pnpm run build

# --- Stage 2: Production Minimal Runtime ---
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Enable pnpm for production runner
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

# Copy package definitions and patches
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches

# Install ONLY production dependencies for minimal image size and fast cold-starts
RUN pnpm install --prod --frozen-lockfile

# Copy pre-built production artifacts from builder stage
COPY --from=builder /app/dist ./dist

# Non-root user for security compliance and Least Privilege principles
USER node

EXPOSE 8080

# Launch server
CMD ["node", "dist/index.js"]
