const mongoose = require('mongoose')
const moment= require('moment') 

var createdAt = function(){
    var d = new Date();
    var formattedDate = moment(d).format("MM-DD-YYYY, h:mm:ss a");
    return formattedDate;
};

const dataSchema = mongoose.Schema({
 
    temperature:{
        type:String,
        required:true

    },
    humidity:{
        type:String,
        required:true,
    },
    moisture:{
        type:String,
        required: true
    },
    timestamp:{
        type:String,
        default:createdAt
    }
  
})

module.exports = mongoose.model('Data', dataSchema)