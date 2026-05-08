# Stage 1: Build with Bun
FROM oven/bun:1 AS build

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install

COPY . .
RUN bun run build

# Stage 2: Serve with nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Railway injects $PORT at runtime; envsubst writes it into the nginx config
CMD ["/bin/sh", "-c", \
  "envsubst '$PORT' < /etc/nginx/templates/default.conf.template \
   > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
