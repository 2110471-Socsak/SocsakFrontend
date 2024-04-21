# Use node.js as the base image
FROM node:18-alpine AS build

EXPOSE 4173
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["npm", "run", "preview"]
