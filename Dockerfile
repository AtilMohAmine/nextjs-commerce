# Use an official Node.js runtime as a base image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Set environment variables
ENV DATABASE_URL=your-mongodb-connection-string \
    PAYPAL_CLIENT_ID=your-paypal-client-id \
    PAYPAL_CLIENT_SECRET=your-paypal-client-secret

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Run Prisma generate
RUN npx prisma generate

# Build the Next.js app
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
