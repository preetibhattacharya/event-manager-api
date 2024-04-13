//const mongoose = require('mongoose');
//const axios = require('axios');


/*const apiKey = 'b4238deff2514163c5fd2515ed3d2057';

// Mongoose schema (assuming your collection has these fields)
const userSchema = new mongoose.Schema({
  city_name: String,
  latitude: Number,
  longitude: Number,
});

const User = mongoose.model('User', userSchema);

async function findWeather() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);

    // Fetch all user documents
    const users = await User.find();

    // Make weather API calls for each user (consider using async/await or Promise.all)
    const weatherDataPromises = users.map(async (user) => {
      const { latitude, longitude } = user;

      if (!latitude || !longitude) {
        console.warn(`Skipping user with missing location data.`);
        return null; // Handle missing location data
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      const response = await axios.get(url);
      const weatherData = response.data;

      const description = weatherData.weather[0].description;
      const maxTemp = weatherData.main.temp_max;

      return { 
        description, maxTemp }; // Include city_name in the return object
    });

    // Wait for all weather data to be retrieved (consider using Promise.all)
    const weatherData = await Promise.all(weatherDataPromises);

    // Filter out any null results (missing location data)
    const filteredWeatherData = weatherData.filter(data => data !== null);

    // Return the weather data for each city
    return filteredWeatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return []; // Or handle the error differently
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
  }
}

// Usage example (you can integrate this into your application logic)
findWeather()
  .then(weatherData => {
    // weatherData now contains an array of objects with city_name, description, and maxTemp
    // Use this data in your application logic
    return weatherData; // You can return the data from the function here
  })
  .catch(error => {
    console.error('Error retrieving weather data:', error);
    // Handle errors appropriately
  });*/

const mongoose = require('mongoose');
const axios = require('axios')
const UserSchema = require('../models/user');
const User = mongoose.model('User', UserSchema)

/*async function findWeather(latitude, longitude) {
  
    
    try {
      if (!latitude || !longitude) {
        return null; // Handle case where location data is missing
      }
      const apiKey = 'b4238deff2514163c5fd2515ed3d2057';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      //const response = await fetch(url);
      //const weatherData = await response.json();
      //const description = weather[0].description;
      //const tempCelsius = main.temp;
      const response = await axios.get(url); // Use axios for HTTP requests
      const weatherData = response.data;



      //return `${description} ${tempCelsius}°C`;
      const description = weatherData.weather[0].description;
      const maxTemp = weatherData.main.temp_max;

      return { description,maxTemp };
    } catch (error) {
      console.error('Error fetching weather:', error);
      return 'null';
    }
  }*/
  async function findWeather() {
    try {
      // Fetch all users (adjust query if needed)
      const users = await User.find();
  
      const weatherDataPromises = users.map(async (User) => {
        const { city_name, latitude, longitude } = User;
  
        if (!latitude || !longitude) {
          console.warn(`Skipping user with missing location data: "${city_name ? city_name : 'Unknown'}"`);
          return null; // Handle missing location data appropriately
        }
  
        const API_KEY='b4238deff2514163c5fd2515ed3d205'
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`; 
  
        try {
          const response = await axios.get(url);
          const weatherData = response.data;
  
          // Extract relevant information
          const description = weatherData.weather[0].description;
          const temperature = weatherData.main.temp; // Celsius
  
          // Return an object containing weather data
          return { description, temperature };
  
        } catch (error) {
          console.error(`Error fetching weather data for ${city_name ? city_name : 'Unknown location'}:`, error);
          return null; // Handle API errors appropriately
        }
      });
      const weatherData = await Promise.all(weatherDataPromises);

    // Filter out any null results (missing location data)
    const filteredWeatherData = weatherData.filter(data => data !== null);

    return filteredWeatherData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return []; // Or handle errors differently
  }
}
  
      // Wait for all weather data promises to resolve
      
      // Return the array containing weather data objects
      //return filteredWeatherData;
    //} catch (error) {
      //console.error('Error fetching user data:', error);
      //return []; // Or handle errors differently
    //}
 // }
  
  // Call the function to retrieve weather data (assuming it's in your main server file)
  //findWeatherForUsers().then(weatherData => {
    //console.log('Weather data for all users:', weatherData);
    // You can further process the weather data here
  //});




// Function to calculate distance between two points (in kilometers)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }


  async function findEventsWithDistance(latitude, longitude, date) {
    if (!latitude || !longitude) {
      throw new Error('Missing latitude or longitude');
    }
    let events = await User.find({
      date: { $gte: new Date(date) }
    }).sort({ date: 1 });


    return events.map((event) => {
      const distance = calculateDistance(
        latitude,
        longitude,
        event.latitude,
        event.longitude
      );

      return {
        city_name: event.city_name,
        event_name: event.event_name,
        date: event.date, 
        distance: `${distance.toFixed(2)} km`,
      };
    });
  }

  module.exports = { findEventsWithDistance, findWeather }
