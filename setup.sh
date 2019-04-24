#!/bin/bash

#URLBACKEND=rest-backend.test
#URLFRONTEND=rest-frontend.test
#URLINFO=rest-api-backend.info
#VAGRANTBOXFOLDER=VM


URLFRONTEND=docker-frontend.test 
URLBACKEND=docker-backend.test


echo "Rechte in Projektverzeichnis für ngnix setzen \n ..."
docker-compose exec php-fpm chown -R www-data:www-data ../backend
echo "Fertig! \n"

echo "Doctrine ORM: Datenbank generieren \n ..."
 docker-compose exec php-fpm php bin/console doctrine:schema:update --force 
echo "Fertig! \n"

echo "Fixtures  Bundle: Dummyeinträge in Datenbank generieren \n ..."
  docker-compose exec php-fpm php bin/console doctrine:fixtures:load
echo "Fertig! \n"


sudo  sed -i -e "/$URLFRONTEND/d" /etc/hosts; sudo sed -i "2i127.0.3.1 $URLFRONTEND"  /etc/hosts
sudo  sed -i -e "/$URLBACKEND/d" /etc/hosts; sudo sed -i "2i127.0.3.2 $URLBACKEND" /etc/hosts

#TODO: npm installieren und abhängigkeiten reinziehen, db dump einspielen, domain namen für service verteilen 