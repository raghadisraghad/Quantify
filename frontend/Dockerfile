# Build Angular
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Serve with nginx
FROM nginx:alpine

COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80