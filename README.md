# Welcome to our mirror projet!

LAP5US team members are pleased to welcome you :blush:


# Run the project

 - First install docker on your computer
 - In the project root run two commands

     - `docker-compose build`
     - `docker-compose up`


**Back :** port 3000
**Front :** port 8080 

## Database

When the database docker instance will start the database in ./db.db.dump will be imported in the docker
if you want to export create a database dump use the following command:
	

`docker-compose exec -T db -c 'mongodump --out=/var/dump'`
if you want you also can import it manually using

`docker-compose exec -T db sh -c 'mongorestore /var/dump'`

### :exclamation:The database can be run without the docker-compose
in db directory

 - `docker build -t mongo_db .`
 - `docker run -d -p 27017:27017 mongo_db`

