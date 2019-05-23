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

echo "installing composer:"
docker-compose exec php-fpm php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
docker-compose exec php-fpm php -r "if (hash_file('sha384', 'composer-setup.php') === '48e3236262b34d30969dca3c37281b3b4bbe3221bda826ac6a9a62d6444cdb0dcd0615698a5cbe587c3f0fe57a54d8f5') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
docker-compose exec php-fpm php composer-setup.php
docker-compose exec php-fpm php -r "unlink('composer-setup.php');"
echo "DONE \n \n"

echo "adding CORS headers to the backend:"
docker-compose exec php-fpm composer req cors
echo "DONE \n \n"

echo "adding jwt authentification bundle:"
docker-compose exec php-fpm composer require jwt-auth
docker-compose exec php-fpm mkdir config/jwt
docker-compose exec php-fpm openssl genrsa -out config/jwt/private.pem -aes256 4096
docker-compose exec php-fpm openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem
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
#toaster   https://github.com/jirikavi/AngularJS-Toaster
docker-compose exec frontend-server  npm install --save angularjs-toaster


#installing dependencies
#TODO: docker-compose exec container befehl1 befehl2 befehl3?
echo "install dependencies via npm:  \n"
docker-compose exec frontend-server npm install angular@1.7.8
docker-compose exec frontend-server npm install angular-ui-router
# falls eigentümer geforkte Änderungen in Repo angenommen hat, kann diese Zeile wieder einkommentiert werden
# solange werden lokale Dateien verwendet ohne diese via npm neuzuinstallieren
# npm install angular-utils-pagination
docker-compose exec frontend-server npm install angular-animate
docker-compose exec frontend-server npm install bootstrap@4.2.1
docker-compose exec frontend-server npm install jquery@latest
docker-compose exec frontend-server npm install gijgo --save
docker-compose exec frontend-server npm install --save-dev @fortawesome/fontawesome-free
docker-compose exec frontend-server npm install ngstorage
echo "DONE! \n \n"

#da Container backend an sich reisst: (777 Nur für DEV Zwecke!!)
sudo chmod -R 777 backend

echo "The Page should be accessible at following URLs : \n
        Frontend: $URLFRONTEND \n
        Backend: $URLBACKEND  \n "



#TODO: npm installieren und abhängigkeiten reinziehen, db dump einspielen, domain namen für service verteilen 