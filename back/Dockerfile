FROM node

WORKDIR /data/back

ADD package*.json /data/back/
RUN npm config set registry http://registry.npmjs.org
RUN npm ci && npm install  --save @nestjs/config @nestjs/typeorm
COPY . .
ADD ./src /data/back

EXPOSE 5000

CMD ["npm", "run", "start:dev"]