const mongoose = require('mongoose');
const express = require('express');
const { findEventsWithDistance } = require('../controllers/eventcontroller');
const{ findWeather }=require('../controllers/eventcontroller')

//const userSchema = require('../models/user');

const router = express.Router();

// /events/find endpoint
/*router.get('/events/find', async (req, res) => {
  const { latitude, longitude,date } = req.query;

  try {
    const user = await User.findOne({ _id: user._id });
    const events = await findEventsWithDistance(latitude, longitude,date);
    const eventsWithWeather = await Promise.all(events.map(async (user) => {
      const weatherData = await findWeather(user.latitude, user.longitude);
    }
     /*const eventsWithWeather = await Promise.all(events.map(async (event) => {
        //const user = await User.findById(event._id); 
        

        if (!user) {
          throw new Error(`User not found for event ID: ${event._id}`);
        }
        // Pass latitude and longitude values to findWeather function
        const weatherData = await findWeather(user.latitude, user.longitude);*/
       /* const eventsWithWeather = await Promise.all(events.map(async (event) => {
          const users = await User.find({ name: event.event_name }).limit(1);
          if (users.length === 0) {
            throw new Error(`User not found for event ID: ${event._id}`);
          }
          const user = users[0];
          // Pass latitude and longitude values to findWeather function
          const weatherData = await findWeather(user.latitude, user.longitude);
      return {
        ...user,
        weather: weatherData
      };
    }));
    res.json(eventsWithWeather);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});*/
router.get('/events/find', async (req, res) => {
  //const { latitude, longitude,date } = req.query;


  try {
    
    const events = await findEventsWithDistance(req.query.latitude, req.query.longitude,req.query.date);
    const eventsWithWeather = await Promise.all(events.map(async (event) => {
      const weatherData = await findWeather(event.latitude,event.longitude);
      return {
        ...event,
        weather: weatherData,
      };
    }));
    res.json(eventsWithWeather);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;