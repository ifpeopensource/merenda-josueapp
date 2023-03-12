# Use the official Node v16 Alpine image as a parent image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of app files
COPY . .

# Set Environment Variables
ARG VITE_API_URL=http://localhost:3000
ENV VITE_API_URL=$VITE_API_URL

# Build the app
RUN npm run build

# Use the official Nginx image for a lean production container.
FROM nginx:alpine

# Set the working directory to Nginx web root
WORKDIR /usr/share/nginx/html

# Copy the build output from the builder stage
COPY --from=builder /usr/src/app/dist .
