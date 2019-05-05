FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

ENV NODE_ENV production
ENV NILU_API_ROOT https://api.nilu.no
ENV MONGODB_URL mongodb://mongo:27017
ENV MONGODB_DB nilu-cache
ENV LOG_LEVEL_CONSOLE debug
ENV PORT 8080
ENV CIRCUIT_BREAKER_TIMEOUT 500

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD npm run serve
