FROM node:10-alpine
ENV NODE_ENV production
RUN apk add --update --no-cache python3 make g++ && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
WORKDIR /data/front

COPY package*.json ./
RUN npm install && npm install -g @vue/cli-service
CMD [ "npm", "run","serve" ]