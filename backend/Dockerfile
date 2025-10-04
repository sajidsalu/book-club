FROM node:18-alpine

WORKDIR /app

# Copy package.json and install deps
COPY package*.json tsconfig.json ./
RUN npm install

# Copy source code and Prisma files
COPY src ./src
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Compile TypeScript
RUN npm run build

# Expose backend port
EXPOSE 4000

# Run compiled JS
CMD ["npm", "start"]
