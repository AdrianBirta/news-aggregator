# News Aggregator React Application

This repository contains a Dockerized React application built with Vite.

## How to Run the Application

1. **Ensure Docker is Installed**
   Download and install Docker from [Docker’s official website](https://www.docker.com/products/docker-desktop).

2. **Pull the Docker Image**
   Run the following command to pull the Docker image from Docker Hub:

   docker pull adrianbirta1/news-aggregator:latest

3. **Run the Docker Container**
   Start a container from the pulled image with the following command:

   docker run -dp 3000:3000 --name news-aggregator-container news-aggregator:latest

4. **Access the Application**
   Open a web browser and navigate to http://localhost:3000 to view the application.

5. **Stopping the Docker Container**
   To stop the container, find its ID by running:

    docker ps
   
   Then stop it using:

   docker stop <container_id>

### Troubleshooting
If you encounter any issues, please contact Adrian Birta at adrian.birta.dev@gmail.com