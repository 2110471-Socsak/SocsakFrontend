# Use node.js as the base image
FROM node:18-alpine AS build

EXPOSE 4173

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

ARG VBU
ARG VSU

RUN echo -e\
    'VITE_BACK_URI=$VBU\n'\
    'VITE_SOCKET_URI=$VSU\n' \
    >> .env.production


RUN npm run build

CMD ["npm", "run", "preview"]
