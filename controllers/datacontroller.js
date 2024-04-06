var data = require('../models/user')
var csv = require('csvtojson')

const importCSV = async (req, res) => {
  try {
    var userdata=[]
    csv()
      .fromFile(req.file.path)
      .then(async (response) => {
        for (var x = 0; x < response.length; x++) {
          userdata.push({
            //event name, city name, date, time, latitude, longitude
            event_name: response[x].event_name,
            city_name: response[x].city_name,
            date: response[x].date,
            time: response[x].time,
            latitude: response[x].latitude,
            longitude: response[x].longitude,
           


          })
        }
        await data.insertMany(userdata)
      })
    res.send({ status: 200, success: true, msg: "running" })

  } catch (error) {
    res.send({ status: 404, success: false, msg: error.message })
  }
}
module.exports = {
  importCSV
}