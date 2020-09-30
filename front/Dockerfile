FROM node:10-alpine

WORKDIR /data/front

COPY package*.json ./
RUN npm install
CMD [ "npm", "run","serve" ]