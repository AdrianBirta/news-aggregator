# News Aggregator React Application
## Description

The News Aggregator Application is a React-based web application that consolidates news articles from multiple sources into a single, user-friendly interface. Users can search for news articles by keywords and filter results by date, category, and source. Additionally, the application provides a personalized news feed where users can customize their news experience based on preferred sources, categories, and authors.

## Features

- **Article Search and Filtering**: Search news articles by keywords and filter results based on date, category, and source.

- **Personalized News Feed**: Customize news content according to sources, categories, and authors.

- **Mobile-Responsive Design**: Fully responsive design to ensure a seamless experience on mobile devices.

## Data Sources

The application integrates with the following news APIs:

- **The Guardian API**: Access articles from The Guardian newspaper with various categories and search options.

- **New York Times API**: Retrieve articles from The New York Times with support for diverse categories and search criteria.

- **NewsAPI.org**: Access news articles from a wide range of sources, including major publications, blogs, and magazines.

## Technology Stack

- **Frontend**: React.js with Vite bundler.

- **Docker**: Containerized deployment for easy setup and portability.

## Setup and Run
### Local Development
For development and testing, follow these steps:
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AdrianBirta/news-aggregator.git
   cd news-aggregator
2. **Install Dependencies**:
   ```bash
   npm install
3. **Run the Application**:
   ```bash
   npm run dev
4. **Build for Production**:
   ```bash
   npm run build

### Docker Setup
To run the application using Docker:

1. **Ensure Docker is Installed** Download and install Docker from Docker’s official website.

2. **Pull the Docker Image** Run the following command to pull the Docker image from Docker Hub:
   ```bash
   docker pull adrianbirta1/news-aggregator:latest
3. **Run the Docker Container** Start a container from the pulled image with the following command:
   ```bash
   docker run -dp 3000:3000 --name news-aggregator-container news-aggregator:latest
4. **Access the Application** Open a web browser and navigate to http://localhost:3000 to view the application.
5. **Stopping the Docker Container** To stop the container, find its ID by running:
   ```bash
   docker ps
   ```
   Then stop it using:
   ```bash
   docker stop <container_id>  

## Troubleshooting
If you encounter any issues, please contact Adrian Birta at adrian.birta.dev@gmail.com
