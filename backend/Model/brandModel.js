const mongoose = require("mongoose")

const brandModel =new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name required"]
    },
    images :{
        type: String,
        required : [true,"Please add Images"]
    },
    isBrand:{
        type:Boolean,
        required:true,
        default:true
    }
},{
    timeseries:true
})

module.exports = mongoose.model("Brand",brandModel)