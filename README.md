# REST-API - Docker

REST-API, Frontend (AngularJS) and Backend (Symfony4 + FOSREST-Bundle).  
Communication goes via JSON.  

### Development-Enviroment:  
Docker.  
  
### Tested on Linux Distributions:  
Ubuntu 16.04  
Ubuntu 18.04  


## Prerequisites

1. Docker Enviroment 18.x <https://www.docker.com/>  
2. Docker Compose Tool  <https://docs.docker.com/compose/install/>


## SET UP THE PROJECT (Tested on Ubuntu(Linux))

1. build the containers, run:  
  ```
  docker-compose up  
  ```
2. wait for the end of build-process !
  
3. if database container is fully build up:  
  1. go into the root of the local repo folder and run following commands:
  ```  
   chmod +x setup.sh
     ```  
   ```
      ./setup.sh  
     ```  

4. when asked: set password: pass (its defined and used in the backend/.env file)
 
4. your project should be available at these urls:  
  ```  
  127.0.3.2  - docker-backend.test  
  127.0.3.1 - docker-frontend.test  
  ```  


## Use 

1. If the Requests get blocked by CORS Policity,  
   Install and enable the following extension in CHROME:  

   Allow-Control-Allow-Origin: *  

   (Only for Development Purposes!)

2. If you Change the Settings (docker-compose.yaml, setup.sh etc.), run:  
   ```  
   docker-compose restart
   ```  
3. Have a break in the development:  
 
```  
//stop containers:
docker-compose stop

//start/restart containers:
docker-compose start

```  

4. Delete Project

Remove Folders from disk and rund following Commands:

```
//stop and delete containers:
docker-compose down
//clean disk
cleandocker.sh

```
