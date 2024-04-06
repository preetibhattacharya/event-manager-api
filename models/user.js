const { Timestamp } = require('mongodb')
var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    //event name,city name,date,time,latitude,longitude
    event_name:{
        type:String
    },
    city_name:{
        type:String
    },
    date:{
        type:Date
    },
    latitude:{
        type:Number
    },
    longitude:{
        type:Number
    }},{timestamps:true}

)
module.exports= mongoose.model('user',userSchema)