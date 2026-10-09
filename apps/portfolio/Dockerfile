FROM node:24-trixie-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN VITE_AUTH_ENABLED=false npm run build

FROM gcr.io/distroless/nodejs24-debian13:nonroot

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8080

COPY --from=build /app/.output /app/.output

EXPOSE 8080

CMD ["/app/.output/server/index.mjs"]
