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
    isBanners:{
        type:Boolean,
        required:true,
        default:true
    }
},{
    timeseries:true
})



module.exports = mongoose.model("Banners",bannersModel)