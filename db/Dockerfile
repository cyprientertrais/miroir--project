FROM alpine
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories
RUN apk update && apk upgrade && apk add --no-cache mongodb mongodb-tools

COPY db.dump /db/db.dump

VOLUME /data/db
EXPOSE 27017

COPY run.sh /root
ENTRYPOINT [ "/root/run.sh" ]
CMD [ "mongod", "--bind_ip", "0.0.0.0" ]

#

#