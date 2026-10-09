FROM node:24-trixie-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN VITE_AUTH_ENABLED=false npm run build
RUN npm install --prefix /srvx srvx@1.0.5

FROM gcr.io/distroless/nodejs24-debian13:nonroot

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8080

COPY --from=build /srvx/node_modules/srvx /srvx
COPY --from=build /app/.vercel/output /app/.vercel/output

EXPOSE 8080

WORKDIR /app/.vercel/output
CMD ["/srvx/bin/srvx.mjs", "--static", "./static", "--host", "0.0.0.0", "--port", "8080", "./functions/__server.func/index.mjs"]
