#!/bin/bash

URLFRONTEND=docker-frontend.test 
URLBACKEND=docker-backend.test

echo "INSTALLING BACKEND ...."
echo "Rechte in Projektverzeichnis für ngnix setzen \n ..."
docker-compose exec php-fpm chown -R www-data:www-data ../backend
echo "Fertig! \n"

echo "Doctrine ORM: Datenbank generieren \n ..."
 docker-compose exec php-fpm php bin/console doctrine:schema:update --force 
echo "Fertig! \n"

echo "Fixtures  Bundle: Dummyeinträge in Datenbank generieren \n ..."
  docker-compose exec php-fpm php bin/console doctrine:fixtures:load
echo "Fertig! \n"

echo "adding CORS headers to the backend:"
docker-compose exec php-fpm php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
docker-compose exec php-fpm php -r "if (hash_file('sha384', 'composer-setup.php') === '48e3236262b34d30969dca3c37281b3b4bbe3221bda826ac6a9a62d6444cdb0dcd0615698a5cbe587c3f0fe57a54d8f5') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
docker-compose exec php-fpm php composer-setup.php
docker-compose exec php-fpm php -r "unlink('composer-setup.php');"
docker-compose exec php-fpm composer req cors
echo "DONE \n \n"

echo "Hosteinträge setzen ..."
sudo  sed -i -e "/$URLFRONTEND/d" /etc/hosts; sudo sed -i "2i127.0.3.1 $URLFRONTEND"  /etc/hosts
sudo  sed -i -e "/$URLBACKEND/d" /etc/hosts; sudo sed -i "2i127.0.3.2 $URLBACKEND" /etc/hosts
echo "DONE \n \n"


#installing dependencies

#TODO: alle dependencies reinziehen aus der anderen setup.sh (vagrant)
#TODO: node-modules löschen wenn fertig

echo "Installing Frontend ..."
#docker exec docker-rest-frontend-server apk add --update nodejs nodejs-npm
#log in
docker exec  docker-rest-frontend-server apk add --update nodejs nodejs-npm
#ui-router
docker exec  docker-rest-frontend-server npm install --save @uirouter/angularjs
#toaster
docker exec  docker-rest-frontend-server npm install angular-toastr

#installing dependencies
echo "install dependencies via npm:  \n"
docker-compose exec frontend-server npm install angular@1.7.8
docker-compose exec frontend-server npm install angular-ui-router
# falls eigentümer geforkte Änderungen in Repo angenommen hat, kann diese Zeile wieder einkommentiert werden
# solange werden lokale Dateien verwendet ohne diese via npm neuzuinstallieren
# npm install angular-utils-pagination
docker-compose exec frontend-server npm install bootstrap@4.2.1
docker-compose exec frontend-server npm install jquery@latest
docker-compose exec frontend-server npm install gijgo --save
docker-compose exec frontend-server npm install --save-dev @fortawesome/fontawesome-free
echo "DONE! \n"


#TODO: npm installieren und abhängigkeiten reinziehen, db dump einspielen, domain namen für service verteilen 