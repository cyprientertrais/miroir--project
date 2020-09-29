FROM  debian:buster-slim

RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

# Install necessary libs
RUN apt-get update && apt-get install -y apt-utils wget gnupg gnupg2 curl

# Install mongodb
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | apt-key add -
RUN echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.2.list
RUN apt-get update
RUN apt-get install -y mongodb-org

# BIND TO ALL ADAPTERS IN CONTAINER
RUN sed -i "s,\\(^[[:blank:]]*bindIp:\\) .*,\\1 0.0.0.0," /etc/mongod.conf

# Install jre 11                                                                                                                                                                                          
# RUN "apt-get install -y openjdk-11-jre"

EXPOSE 27017
ENTRYPOINT ["/usr/bin/mongod", "-f", "/etc/mongod.conf"]