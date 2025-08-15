# FROM node:20-alpine AS builder
# WORKDIR /app
# COPY package.json package-lock.json* .npmrc* ./
# RUN npm ci || npm i
# COPY . .
# RUN npm run build

# FROM node:20-alpine
# WORKDIR /app
# ENV NODE_ENV=production
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/dist ./dist
# EXPOSE 4000
# CMD ["node", "dist/main.js"]

FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; else npm i --no-audit --no-fund; fi
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
EXPOSE 4000
CMD ["node", "dist/main.js"]

