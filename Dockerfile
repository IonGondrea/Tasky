# Build stage (Debian, not Alpine)
FROM --platform=linux/amd64 node:20-bullseye-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci || npm install
COPY . .
RUN npm run build   # pentru Vite -> dist; pentru CRA -> build

# Runtime stage (Nginx Debian)
FROM --platform=linux/amd64 nginx:1.27-bookworm
# Vite:
COPY --from=build /app/dist /usr/share/nginx/html
# (dacă e Create React App, schimbă în /app/build)
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
