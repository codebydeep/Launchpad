# stage 1

FROM node:18-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

# stage 2

FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN rm -rf \
  /app/node_modules/.cache /root/.npm

EXPOSE 4000

CMD ["node", "src/index.js"]
