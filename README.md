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
