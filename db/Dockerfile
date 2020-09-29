FROM alpine
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories
RUN apk update && apk upgrade && apk add --no-cache mongodb mongodb-tools
COPY . /var/dump
VOLUME /data/db
EXPOSE 27017

COPY run.sh /root
CMD [ "mongod", "--bind_ip", "0.0.0.0" ]
ENTRYPOINT [ "/root/run.sh" ]