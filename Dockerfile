# syntax=docker/dockerfile:1
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY .env.local ./
RUN npm install

COPY . .

RUN npm run build

# ---- Production image ----
FROM node:18-alpine AS production

WORKDIR /app

COPY --from=build /app ./

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
