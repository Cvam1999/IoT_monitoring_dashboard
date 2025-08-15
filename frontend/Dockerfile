# FROM node:20-alpine AS builder
# WORKDIR /app
# COPY package.json package-lock.json* .npmrc* ./
# RUN npm ci || npm i
# COPY . .
# RUN npm run build

# FROM node:20-alpine
# WORKDIR /app
# ENV NODE_ENV=production
# COPY --from=builder /app/dist ./dist
# RUN npm i -g serve
# EXPOSE 5173
# CMD ["serve", "-s", "dist", "-l", "5173"]

FROM node:20-alpine AS builder
WORKDIR /app

# Install deps deterministically (works with or without lockfile)
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; else npm i --no-audit --no-fund; fi

# Now copy the source and build
COPY . .
RUN npm run build

# Runtime image
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
RUN npm i -g serve
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
