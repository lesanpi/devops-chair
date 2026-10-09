FROM node:22-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

COPY . .

ENV VITE_AUTH_ENABLED=false
RUN npm run build

FROM node:22-bookworm-slim

WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8080

COPY --from=build /app/.vercel/output /app/.vercel/output

EXPOSE 8080

WORKDIR /app/.vercel/output
CMD ["npx", "--yes", "srvx", "--static", "./static", "--host", "0.0.0.0", "--port", "8080", "./functions/__server.func/index.mjs"]