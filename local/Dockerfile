FROM node:20-alpine

RUN apk update && apk add curl libcurl

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "run", "server"]
