# Base image
FROM node:18

# Working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Expose development server port
EXPOSE 3000

# Start React development server
CMD ["npm", "start"]
