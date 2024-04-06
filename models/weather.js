const mongoose= require('mongoose')

const weatherSchema = new mongoose.Schema({
    weather:{
        type:String
    }
})
module.exports = mongoose.model('weather',weatherSchema)