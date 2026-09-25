# ==============================================================================
# Production Multi-Stage Dockerfile for Ghazara (Google Cloud Run & Cloud Build)
# ==============================================================================

# --- Stage 1: Build & Bundle ---
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

# Copy dependency specifications
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including devDependencies needed for build)
RUN pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Build Vite client assets and esbuild server runtime
RUN pnpm run build

# --- Stage 2: Production Minimal Runtime ---
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Install pnpm for production runner
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

# Copy package definition
COPY package.json pnpm-lock.yaml ./

# Install ONLY production dependencies
RUN pnpm install --prod --frozen-lockfile

# Copy built artifacts from builder stage
COPY --from=builder /app/dist ./dist

# Non-root user for security compliance
USER node

EXPOSE 8080

# Start production server
CMD ["node", "dist/index.js"]
