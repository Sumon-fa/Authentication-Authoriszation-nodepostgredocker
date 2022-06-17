# Authentication and Authrization

A project of Authentication and Authrization build by node, postgresql,docker and s3

## To run the project

Go to the docker-compose.yml file at root directory.
Set up your environment variable for postgresql and server.
server is named here as api.
There is port '4000:5000'.If you want you can change the port.When you use port 4000 locally, it will map to the container.
you can find container id by running docker ps command
if you want to install any packages, you can go to terminal write docker exec -it <container id> sh
When you first time build the images write docker-compose up --build
To start the container just write docker-compose up
