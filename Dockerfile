# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npm run build

# Install serve to serve the build
RUN npm install -g serve

# Command to run the app
CMD ["serve", "-s", "dist"]

# Expose port 3000 to the outside world
EXPOSE 3000
