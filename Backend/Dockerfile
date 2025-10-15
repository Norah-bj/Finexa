# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy all source code
COPY . .

# Build the app
RUN pnpm run build

# Expose app port
EXPOSE 3000

# Start the app
CMD ["pnpm", "run", "start:dev"]
