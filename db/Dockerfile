FROM mongo
RUN mkdir -p /data/db /var/dump/db
COPY basic-dataset.zip .
<<<<<<< HEAD
RUN apt-get update && apt-get install unzip && unzip basic-dataset.zip -d /var/dump/
=======
RUN apt-get update && apt-get install unzip && unzip basic-dataset.zip -d /var/dump
>>>>>>> fix-widgets
CMD ["mongod"]