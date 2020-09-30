FROM arm7/mongo
RUN mkdir -p /data/db
COPY basic-dataset.zip .
RUN apt-get install unzip && unzip basic-dataset.zip -d /var/dump
CMD ["mongod"]