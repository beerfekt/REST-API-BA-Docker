# REST-API - Docker

REST-API, Frontend (AngularJS) and Backend (Symfony4 + FOSREST-Bundle).  
Communication goes via JSON.  

Development-Enviroment: Docker. 
  

## SET UP THE PROJECT (Tested on Ubuntu(Linux))

1. build the containers:  
  
  run docker-compose up  

2. wait for the end of build-process 
  
3. if database container is fully build up:  
  1. go into the root of the local repo folder and run following commands:
  2. chmod +x setup.sh
  3. ./setup.sh  
 
4. your project should be available at these urls:  
  
  127.0.3.2  - docker-backend.test  
  127.0.3.1 - docker-frontend.test  



## Use 

1. If the Requests get blocked by CORS Policity,  
   Install and enable the following extension in CHROME:  

   Allow-Control-Allow-Origin: *  

   (Only for Development Purposes!)

2. If you Change the Settings (docker-compose.yaml, setup.sh etc.), run:  
   
   docker-compose restart

3. Have a break in the development:
  
    //root of homestead 
    
    //stop box  
    vagrant halt
    
    //continue developing  
    vagrant up  



##3 put angularjs frontend into folder ./frontend

##4 put symfony4 backend into folder ./backend

PROJEKT ANHALTEN:
docker-compose stop

PROJEKT WEITERMACHEN:
docker-compose start


PROJEKT ENTFERNEN:
docker-compose down
cleandocker.sh