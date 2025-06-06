# Stage 1: Build
FROM node:23-bookworm-slim AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY . .
RUN if [ ! -f .env.production.local ]; then \
    echo "Warning: .env.production.local not found. Creating an empty one." && \
    touch .env.production.local; \
    fi
RUN pnpm install && pnpm run build
RUN pnpm prune --prod
RUN rm -rf node_modules/.cache

# Stage 2: Run
FROM node:23-slim
WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.env.production.local .env.production.local
COPY --from=builder /app/certs ./certs
COPY --from=builder /app/public ./public

ENV NODE_ENV=production
USER node
EXPOSE 3000
CMD ["node", "server.js"]