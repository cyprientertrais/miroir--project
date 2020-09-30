FROM node

WORKDIR /data/back

ADD package*.json /data/back/
RUN npm config set registry http://registry.npmjs.org
RUN npm install && npm install --save @nestjs/config @nestjs/typeorm
ADD ./src /data/back

EXPOSE 3000

CMD ["npm", "run", "start"]