# images

# MsSqlServer
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=saddam98" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest  

############################# Docker

# commands
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

## Notes:

1. When we run two images in different containers the network pth between two containers is prohibited, you have set up networking permissions explicitly
    Solution is 1.docker-compose file   2. software defined network    

#### Creating a custom image

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


#### To sync ur local repo tocontainer repo use volumes caleed bindmount

syntax:
docker run -v pathlocallocation:pathcontainerlocation -dp 3000:3000 --name <container> <image>
docker run -v ${pwd}:/app -dp 3000:3000 --name  nodecontainer node_app_imag
docker run -v ${pwd}:/app:ro -dp 3000:3000 --name  nodecontainer node_app_imag //readonly bind mount volume
docker run -v ${pwd}:/app -v /app/node_modules -dp 3000:3000 --name  nodecontainer node_app_imag  //prevents overriding nodemodules from local repo


#### setting environment variable

docker run -v ${pwd}:/app -v /app/node_modules --env PORT=4000 -dp 3000:4000 --name  nodecontainer node_app_imag  //prevents overriding nodemodules from local repo
docker run -v ${pwd}:/app -v /app/node_modules --env-file ./.env -dp 3000:4000 --name  nodecontainer node_app_imag  //prevents overriding nodemodules from local repo


### clearnig volumes

docker volume prune
docker volume volumeId
docker rm <container> -fv //deletes with volume
docker volume ls  //list all volumes

## Docker compose file

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

## docker-compose

1. reduces reliance on, and simplifies use of, docker command line
2. Allows us to run multiple containers quickly
3. Allows us to set up the connections between containers

## .net core and SqlServer  

## Scenario 1 : .net core app running on local and SqlServer on docker

1. Execute this command:
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=saddam98" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest  

this command will pull the image from microsoft container registry and run in a container

2. We can use migration file to create schema in db

3. Create a service class to Migrate the data from migration file in the code itself (Its not the right way)

public static class SeedData
    {
        public static void PopulateData(IApplicationBuilder app)
        {
            using(var services = app.ApplicationServices.CreateScope())
            {
                SeedDataBase(services.ServiceProvider.GetService<ApplicationDbContext>());
            }
        }

        private static void SeedDataBase(ApplicationDbContext applicationDbContext)
        {
            applicationDbContext.Database.Migrate();
        }
    }

4. In Startup class call this method 
### setting keys for sqlserver using environment variables in docker compose file else default
            var server = Configuration["DbServer"] ?? "localhost";
            var port = Configuration["Port"] ?? "1433";
            var username = "SA";
            var password = Configuration["Password"] ?? "Saddam_98";
            var database = Configuration["Db"] ?? "Parky";

            var conString = $"Server = {server},{port};Initial Catalog ={database};User ID = {username};Password = {password}";
            //services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("myCon")));
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(conString));

In Configure Method,
            SeedData.PopulateData(app);



# DockerImages


# Docker Compose Files
           
# Theory  
## Why container?
### Bad Old Days
- application runs businesses
- no app no business
- Its impossible to distinguish between the business and the apps that powers it
- In old days, in 2000s, we use to host a single application in a single server
#### Old Model
- If business need a new application , IT people will have to buy a server which include expenses like  
    1. Upfront CapEx cost
    2. OpEx cost (power and cooling)
    3. hire people to build and administrate this stuff
- things which difficult to decide when buying server
    1. how big
    2. how fast
- so IT would have to buy big and fast server to be cautous otherwise that would lead to poor performance of app that inturn bad for business
- this always end up purchasing big and expensive servers and most of the tie uses only 5% of their capacity 
- proper waste of company capital and resources
### Hello Vmware
- this technology takes that same over spec'd server and squeeze more out of them and let us run multiple application   
- overpowered Servers became useful now
- Vmware is a company, hypervisor is a technology
### Vmware warts
- to run 4 apps, we create four Vms which are slice of physical server's hardware
- imagine we allocated 25% of cpu, memory, disk space for each Virtual server
- Each Virtual machine requires dedicated OS that takes lot of resources
   1. liceses to run windows/linux/mac os
   2. each os needs caring, admin staff like security patching, updating, antivirus management
### Containers   






