
const mongoose = require('mongoose');
const axios = require('axios')
const UserSchema = require('../models/user');
const User = mongoose.model('User', UserSchema)

async function findWeather(latitude, longitude) {
  
    
    try {
      if (!latitude || !longitude) {
        return null; 
      }
      const apiKey = 'b4238deff2514163c5fd2515ed3d2057';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      
      const response = await axios.get(url);
      const weatherData = response.data;



      //return `${description} ${tempCelsius}°C`;
      const description = weatherData.weather[0].description;
      const maxTemp = weatherData.main.temp;

      return  `${description} ${maxTemp}C`;
    } catch (error) {
      console.error('Error fetching weather:', error);
      return 'null';
    }
  }

  




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
        latitude:event.latitude,
        longitude:event.longitude,
        date: event.date, 
        distance: `${distance.toFixed(2)} km`,
      };
    });
  }

  module.exports = { findEventsWithDistance, findWeather }
