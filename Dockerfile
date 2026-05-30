# ────────────────────────────────────────────────────────────
# Stage 1 – Install dependencies
# ────────────────────────────────────────────────────────────
FROM node:20-alpine AS deps

WORKDIR /app

# Install libc compat for Alpine (required by some native modules)
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --frozen-lockfile

# ────────────────────────────────────────────────────────────
# Stage 2 – Build the application
# ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

RUN --mount=type=cache,target=/app/.next/cache \
    npm run build

# ────────────────────────────────────────────────────────────
# Stage 3 – Production runtime (minimal image)
# ────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# Copy only what Next.js standalone needs
COPY --from=builder /app/public            ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone  ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static      ./.next/static

# Copy markdown blog posts into the container
COPY --from=builder --chown=nextjs:nodejs /app/content           ./content

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Next.js standalone produces a self-contained server.js
CMD ["node", "server.js"]
