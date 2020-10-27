#!/bin/bash
sudo docker-compose -f docker-compose-rasp.yaml down  && sudo docker-compose -f docker-compose-rasp.yaml rm -v db && sudo docker-compose  -f docker-compose-rasp.yaml up -d
sudo docker-compose exec -T db sh -c 'mongorestore /var/dump'