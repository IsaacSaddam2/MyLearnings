### images

# MsSqlServer
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=saddam98" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest  

#############################Docker
visit hub.docker.com/node

notes:
docker ps   														//to see running containers
docker ps -a   														//to see running or stopped containers
docker logs <container-name>
docker image ls  													// to see list of images
docker image rm id  												// remove image
docker build -t <name-image> .  								    //dot is current directory
docker run --name <container-name> <image-name>  					//build container with name use -d for detach mode 
docker run -p 3000:3000 --name <container-name> <image-name>  		//run docker by setting localhost port
docker exec -it <containername> bash
ls 																    // list all files in container directory
%cd% in command  													// fetch current path
${pwd} in poweshell  												// fetch current path
cat filename   														// print contents of file
npm install nodemon --save-dev 
nodemon -L index.js  												//-Lfixes issue
printenv //prunts all envi variables
docker-compose up  												    //runs the dockercompose file
docker-compose down  												//downs the dockercompose file
docker-compose down -v  											//downs the dockercompose file

#####Creating a custom image

1. Create a docker file (set of instruction for creating an image eg. Dockerfile)

Steps:
1.FROM node:<version>  //base image (get it from dockerhub or local repo)
2.WORKDIR /app        //sets working directory of a container to /app (optional step),if we copy anything to container it will copied here
3.COPY package.json /app  //copies the package.json to specified directory here it is /app
4.RUN npm install  --only=production       //it will run npminstall leaving dev dependencies usedonly for production
5.COPY . .                // it will copy all files in a current directoty to dockerfile
6.EXPOSE 3000			//port number
7.CMD["node index.js]   

2. Build the docker file
command:
docker build .  //dot means current directory
docker image ls  // all created images
docker image rm imageID  // remove the image
docker build -t node-app-image . // build image with name

##### Running docker image

3.Run the docker image  //container is a running instance of image

docker run --name <container-name> <image-name>  //build container with name use -d for detach mode

4. check the container running

docker ps

5.To set port
docker run -p 3000:3000 --name <container-name> <image-name>

6.File sysytem of container
docker exec - it <container-name> bash

7.Dockerfile,DockerIgnore and node_modules folder are not required in container

docker rm <container-name>   

create .dockerignore 

########### For updating image
docker rm containername
docker build -t image_name .
docker run -dp 3000:3000 --name <container> <image>


######### To sync ur local repo tocontainer repo use volumes caleed bindmount

syntax:
docker run -v pathlocallocation:pathcontainerlocation -dp 3000:3000 --name <container> <image>
docker run -v ${pwd}:/app -dp 3000:3000 --name  nodecontainer node_app_imag
docker run -v ${pwd}:/app:ro -dp 3000:3000 --name  nodecontainer node_app_imag //readonly bind mount volume
docker run -v ${pwd}:/app -v /app/node_modules -dp 3000:3000 --name  nodecontainer node_app_imag  //prevents overriding nodemodules from local repo


##### setting environment variable

docker run -v ${pwd}:/app -v /app/node_modules --env PORT=4000 -dp 3000:4000 --name  nodecontainer node_app_imag  //prevents overriding nodemodules from local repo
docker run -v ${pwd}:/app -v /app/node_modules --env-file ./.env -dp 3000:4000 --name  nodecontainer node_app_imag  //prevents overriding nodemodules from local repo


#######clearnig volumes

docker volume prune
docker volume volumeId
docker rm <container> -fv //deletes with volume
docker volume ls  //list all volumes

########Docker compose file

create docker-compose.yml    //used to run manage multiple commands with single command

docker-compose.yml: (***************Spacing mttersin yml file)

version: "3" //latest version of docker-compose
services:
	service-name:
		build: .   //builds image from currentdirectory
		ports:
		  -"3000:3000"  // '-'  represents list
		volumes:
		  - ./:/app:ro	 //here no need to use %cd%
		  - /app/node_modules
		environment:
		  - PORT=3000
		  env_file:     //if evn fromfile
			-./.env

eg:
version:"3"
services:
  node_app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./:/app:ro
      - /app/node_modules
    environment:
      - PORT=3000
      # env_file:
      #   -./.env  
	  
docker-compose up

############docker-compose.prod.yml	  
version:"3"
services:
  node_app:
	environment:
		- Node_ENV = production
	command: node index.js 	

##############docker-compose.dev.yml
version:"3"
services:
  node_app:
    volumes:
      - ./:/app:ro
      - /app/node_modules 
    environment:
	  - Node_ENV = development
    command: npm start 		

###############To run docker compose for development

In terminal,
docker-compose -f docercompose.yml -f docker-compose.dev.yml up -d  //sequence is importance

###############To run docker compose for production

In terminal,
docker-compose -f docercompose.yml -f docker-compose.prod.yml up -d  //sequence is importance
docker-compose -f docercompose.yml -f docker-compose.prod.yml up -d --build //sequence is importance will build the image

##############Modifying Dockerfile

FROM node:14            
WORKDIR /app            
COPY package.json /app 
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
		then npm install; \
		else npm install --only=production; \
		fi                //end of if statement
		
COPY . .      
ENV PORT=4000         
EXPOSE $PORT		   
CMD ["npm","start"] 

##################Modifying build docker-compose.prod\

version: "3"
services:
  node-app:
   build:
      context: .                  //context means path
      args:							//Args arguments passed to dockerfile											
        NODE_ENV: production   
     environment:
      - NODE_ENV = production
     command: node index.js


################## Adding another mango container in docker-compose.yml file
version: "3"
services:
  node-app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
  database:                                        //service-name or container-name
    image: mongo                                   //base image
    environment:
      - MONGO_INITDB_ROOT_USERNAME=saddam
      - MONGO_INITDB_ROOT_PASSWORD=saddam98


### .net core and SqlServer  