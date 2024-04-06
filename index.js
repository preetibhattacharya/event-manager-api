const express = require('express')
var mongoose = require('mongoose')
const app = express()
const port = 5007 || process.env.PORT
//const csvImporter = require('./controllers/datacontroller')// Assuming csvImporter.js is in the same directory
const URI = 'mongodb+srv://API:EsqpOiy9eWWdDtDR@cluster0.2al65tk.mongodb.net/'

mongoose.connect(URI)
var dataRoute=require('./routes/dataroutes')
app.use('/',dataRoute)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})