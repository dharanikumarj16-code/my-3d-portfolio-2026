# ==========================================
# 1. Base image with Node.js and PNPM
# ==========================================
FROM node:20-alpine AS base

# Install libc6-compat for Alpine compatibility with native packages (sharp, parcel, etc.)
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Enable corepack and activate pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

# ==========================================
# 2. Dependencies installation
# ==========================================
FROM base AS deps
WORKDIR /app

# Copy dependency definition files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./

# Install dependencies (respecting lockfile)
RUN pnpm install --frozen-lockfile

# ==========================================
# 3. Source build
# ==========================================
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV BUILD_STANDALONE=true

# Build standalone Next.js bundle
RUN pnpm build

# ==========================================
# 4. Production Runner
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Security: Create non-root user and group
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public assets and static files
COPY --from=builder /app/public ./public

# Set permissions for cache directory
RUN mkdir .next && chown nextjs:nodejs .next

# Copy standalone output and static assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Next.js standalone server entry point
CMD ["node", "server.js"]
