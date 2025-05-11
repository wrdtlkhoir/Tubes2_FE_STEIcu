# syntax=docker/dockerfile:1
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
COPY .env.local ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]