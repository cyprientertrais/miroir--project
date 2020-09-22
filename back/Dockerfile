FROM node:carbon

COPY ./docker/entrypoint.sh /entrypoint/

RUN ["chmod", "+x", "entrypoint/entrypoint.sh"]

# Copy or mount node app here
WORKDIR /data/
RUN npm i -g @nestjs/cli &&  npm install
EXPOSE 3000

CMD ["npm", "start"]