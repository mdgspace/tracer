# Start from a Node base image
FROM node:latest
# Set the working directory
WORKDIR /app
# Set environment variables
ARG REACT_APP_BACKEND_HOST
ENV REACT_APP_BACKEND_HOST=${REACT_APP_BACKEND_HOST}
ARG REACT_APP_BACKEND_PORT
ENV REACT_APP_BACKEND_PORT=${REACT_APP_BACKEND_PORT}
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the code
COPY . .
# Build the app
RUN npm run build
# Expose the port the app runs on
EXPOSE 3000
# Start the application
CMD ["npm", "start"]