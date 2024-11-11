# Modernized Weather Test Project

This project is a modernization of the previous `weather_app` repository, utilizing a more modern tech stack. The frontend has been upgraded to use Vue 3 with Vuetify for the UI components and Pinia for state management. The backend has been refactored to use Nest.js with MongoDB.

### Technologies Used

- **Frontend**:
    - [Vue 3](https://v3.vuejs.org/) : Leveraging Vue's Composition API for a more organized and flexible component structure.
    - [Vuetify](https://vuetifyjs.com/) : Using Vuetify's material design components for consistent and modern UI styling.
    - [Pinia](https://pinia.vuejs.org/) : Replacing Vuex with Pinia for more intuitive state management.

- **Backend**:
    - [Nest.js](https://nestjs.com/) : Providing a fast backend server setup based on Node.js.
    - [MongoDB](https://www.mongodb.com/) : Utilizing MongoDB for a scalable, NoSQL database solution.

## Project Structure

The project is divided into two main directories:

- **frontend/**: Contains the Vue 3 application, including components, stores, and services for interacting with the backend.
- **backend/**: Contains the Nest.js server, including routes, controllers, services, Web Socket and database models.

## Setting Up The Backend

### Setting Up with Docker

To set up the project using Docker, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

3. ```bash
   cd backend
    ```

3. **cp .env_sample .env**
4. **Fill in the Environment Variables**:
   Edit the .env file and fill in the necessary values for MongoDB connection, ports, and any other required settings.
5. **Build and Run the Containers:** Execute the following command to build and start the containers:
    ```bash
   docker-compose up -d --build
   ```

6. **Retrieve a Weather API key from https://api.weatherapi.com** and fill the WEATHER_API_KEY in the .env

7. **Install Dependencies and Start the Node Server:** After the containers are running, execute the following command to install npm packages inside the Node container and start the server:
   ```bash
   docker exec -it weather_nest npm install
   docker exec -it weather_nest npm run start
   ```

8. **Access the Application:**
    - Nest.js API: http://localhost:8085
    - Mongo Express: http://localhost:8081



### Setting Up without Docker

To set up the project without using Docker, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. ```bash
   cd backend
    ```
3. **cp .env_sample .env**
4. **Fill in the Environment Variables**:
   Edit the .env file and fill in the necessary values for MongoDB connection, ports, and any other required settings.
5. **Install Dependencies:** Ensure you have Node.js and MongoDB installed. Run the following command to install the necessary packages:
   ```bash
   npm install
   ```
6. **Run MongoDB:** Start the MongoDB service. Ensure it's running and accessible.
7. **Retrieve a Weather API key from https://api.weatherapi.com** and fill the WEATHER_API_KEY in the .env
8. **Start the Node.js Application:** Run the following command to start the server:
   ```bash
   npm run start
   ```
9. **Access the Application:**
    - Node.js API: http://localhost:8085

