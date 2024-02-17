FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json /

# Install dependencies
RUN npm ci

# Copy the rest of the code
COPY . .

# Build the app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run","start"]