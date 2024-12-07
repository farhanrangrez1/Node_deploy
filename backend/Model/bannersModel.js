const mongoose = require("mongoose")

const bannersModel =new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name required"]
    },
    images :{
        type: String,
        required : [true,"Please add Images"]
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
},{
    timeseries:true
})



module.exports = mongoose.model("Banners",bannersModel)