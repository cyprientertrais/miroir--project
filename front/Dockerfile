FROM node:carbon



# Copy or mount node app here
WORKDIR /data/
COPY . .

RUN npm install
EXPOSE 8080
CMD ["npm", "run","serve"]