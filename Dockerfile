# -------- Stage 1: Build Vite React --------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source
COPY . .

# Build the project
RUN npm run build


# -------- Stage 2: Serve with Nginx --------
FROM nginx:stable-alpine

# Copy build output to Nginx's public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default Nginx config so it runs on 5173
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 5173
EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
