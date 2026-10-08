FROM node:20-alpine3.20 AS base

WORKDIR /usr/src/app

RUN apk add --no-cache libc6-compat

COPY package*.json ./

RUN npm install

# Stage 2: Production environment
FROM base AS production

WORKDIR /usr/src/app
COPY . .

# Install sequelize CLI and other necessary packages globally
RUN npm install -g sequelize-cli

# Expose the production port
EXPOSE 3333

# Run Sequelize migrations before starting the app
CMD ["sh", "-c", "npx sequelize db:migrate && node index.js"]
