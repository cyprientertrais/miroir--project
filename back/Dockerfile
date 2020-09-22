FROM node:carbon


# Copy or mount node app here
WORKDIR /data/
COPY . .

RUN npm install
EXPOSE 3000
CMD ["npm", "start"]