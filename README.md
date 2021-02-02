# Welcome to our mirror projet!

LAP5US team members are pleased to welcome you :blush:

# Installation

First you have to install docker and docker-compose
    - Docker installation: https://docs.docker.com/get-docker/
    - Docker compose installation: https://docs.docker.com/compose/install/

# Run the project

 - In the project root run two commands

     - `docker-compose build`
     - `docker-compose up`


**Back :** http://localhost:3000
**Front :** http://localhost:8080 

## Database

When the database docker instance will start the database in ./db.db.dump will be imported in the docker
if you want to export create a database dump use the following command:
	
`docker-compose exec -T db -c 'mongodump --out=/var/dump'`


if you want you also can import it manually using
Get db id using 
`docker ps`

`docker exec -it "id" sh -c 'mongorestore /var/dump'`

If you want to import into the alone running mongodb, do the following:
- get the container id with `docker ps`
- `docker exec -it <id> bash`
- `mongorestore /var/dump` inside your container's shell

### :exclamation:The database can be run without the docker-compose
in db directory

 - `docker build -t mongo_db .`
 - `docker run -d -p 27017:27017 mongo_db`

