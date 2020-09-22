FROM node:10-alpine

WORKDIR /data/back

COPY package*.json ./
RUN npm install

COPY . .
CMD [ "npm", "start" ]