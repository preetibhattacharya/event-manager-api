const bodyParser = require('body-parser')
const express = require('express')
const data = express()

const multer= require('multer')
const path= require('path')
//const bodyParser= require('body-parser')

data.use(bodyParser.urlencoded({extended:true}))
data.use(express.static(path.resolve(__dirname,'public')))

var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)

    }
})
var upload = multer({storage:storage})
const datacontroller = require('../controllers/datacontroller')
data.post('/importdata',upload.single('file'),datacontroller.importCSV)

module.exports = data;
