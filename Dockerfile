FROM node:latest

WORKDIR /backend_api

COPY package.json /backend_api/package.json

RUN npm install

COPY . /backend_api

CMD [ "node", "server.js"]