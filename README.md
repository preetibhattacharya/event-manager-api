# Event Manager Api
Problem Statement:-I was given a CSV file with diffrent datset based on an event its name,city,date,time,latitude and longitude and i was asked to use two external apis 'Weather API' and 'Distance Calculation API' to give the diatance of the location from the location in request query and on the basis of date and location and I had to predict the weather also.

# Procedure and Approach
I have chosen Javascript for approaching the problem as i am curently working in full stack web development,nothing suited me better than it.

* I chose setting up 'Node' environment by installing the required packages and dependencies using 'npm'.

* Next,the whole file folder layout was made including specific folders for data models,controllers and routing data to defined end point.

* The server was being set up then using exxpres js at localhost port number 5007, and the project is connected to mongodb by obtaining a connection string.

* Then,The Schema for database is develped and then, CSV file is being uploaded at the endpoint '/importcsv'.

* After,uploading of Data The diatance calculation is being from user's manually typed location to the event location made by writing the specific logic.

* Then, the 'openweathermap' api is called for weather prediction purpose

# Challenges Faced
The biggest challenge for me was to call external apis as there documentation was not given to me. So,I chose to calculate distance by manually writing the logic by applying 'HaverSine Formula' and chose the best-fit weather api the 'openweathermap' which was best suiting my requriements.

# Event Weather Predictor

Event Weather Predictor is a Node.js application that allows users to import event data from a CSV file into a MongoDB database and retrieve event information including weather predictions and distances from a given latitude and longitude.

## Features

- Import event data from CSV files into MongoDB.
- Retrieve event information including weather predictions and distances.
- Utilizes MongoDB Atlas for cloud-based database storage.
- Uses various Node.js dependencies including Express, Mongoose, Axios, csvtojson, and more.

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/your-username/event-manager-api.git
    ```

2. Install dependencies:

    ```
    cd event-manager-api
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:

    ```
    MONGODB_URI=<your_mongodb_uri>
    OPENWEATHERMAP_API_KEY=<your_openweathermap_api_key>
    ```

4. Start the server:

    ```
    npm start
    ```

## Usage

### Import Event Data

To import event data from a CSV file, make a `POST` request to `/importdata` endpoint with the CSV file using tools like Postman or cURL:



### Find Events

To find events, predict the weather of event locations, and find the distance of event locations from a given latitude and longitude, make a `GET` request to `/events/find` endpoint with latitude, longitude, and date parameters:




