#In order to dump database after your changes in database
docker-compose exec -T db -c 'mongodump --archive' > db/db.dump


#In order to import database when  it have been started
docker-compose exec -T db sh -c 'mongorestore --archive' < db/db.dump
