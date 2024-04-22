# Use node.js as the base image
FROM node:18-alpine AS build

EXPOSE 4173

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

ARG VITE_BACK_URI
ARG VITE_SOCKET_URI

RUN echo "VITE_BACK_URI:$VITE_BACK_URI" >> .env
RUN echo "VITE_SOCKET_URI:$VITE_SOCKET_URI" >> .env
RUN cat .env

RUN npm run build

CMD ["npm", "run", "preview"]
