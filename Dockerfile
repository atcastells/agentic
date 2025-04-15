# Stage 1: Build the application
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies first for layer caching
COPY package.json package-lock.json* ./
RUN npm install

# Copy TypeScript config and source code
COPY tsconfig.json ./
COPY src ./src

# Build the TypeScript code
# Ensure the 'build' script exists in package.json and outputs to 'dist'
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine
WORKDIR /app

# Copy package files and install only production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copy compiled code from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the application port (configurable with build arg)
ARG PORT=3000
EXPOSE $PORT

# Default command to run the application
CMD ["node", "dist/index.js"]