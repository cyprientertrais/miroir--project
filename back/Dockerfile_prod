FROM node:12-alpine
WORKDIR /app

COPY ./ /app

RUN npm install ; \
    npm run  build

CMD ["npm", "run","start:prod"]