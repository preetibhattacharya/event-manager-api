const express = require('express');
const { findEventsWithDistance } = require('../controllers/eventcontroller');
const{ findWeather }=require('../controllers/eventcontroller')

const router = express.Router();

// /events/find endpoint
router.get('/events/find', async (req, res) => {
  const { latitude, longitude,date } = req.query;

  try {
    const events = await findEventsWithDistance(latitude, longitude,date);
    const eventsWithWeather = await Promise.all(events.map(async (event) => {
      //const weatherData = await findWeather(event.latitude, event.longitude);
      const weatherData = await findWeather();
      return {
        ...event,
        weather: weatherData
      };
    }));
    res.json(eventsWithWeather);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;