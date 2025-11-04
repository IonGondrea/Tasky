FROM --platform=linux/amd64 node:20-bullseye-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci || npm install
COPY . .
RUN npm run build

FROM --platform=linux/amd64 nginx:1.27-bookworm
# Replace default nginx config with our proxy that forwards /api to the backend service (api:8080)
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy static assets produced by the build
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
