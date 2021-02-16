FROM mongo
RUN mkdir -p /data/db /var/dump/
COPY basic-dataset.zip .
RUN apt-get update -y && apt-get install unzip -y && unzip basic-dataset.zip -d /var/dump/ 
CMD ["mongod"]