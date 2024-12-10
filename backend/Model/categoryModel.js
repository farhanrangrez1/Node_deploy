const mongoose = require("mongoose")


const categoryModel =new mongoose.Schema({
    customId: {
        type: Number,
        unique: true,
        required: true,
    },
    name:{
        type:String,
        required:[true,"name required"]
    },
    images :{
        type: String,
        required : [true,"Please add Images"]
    },
    isCategory:{
        type:Boolean,
        required:true,
        default:true
    }
},{
    timeseries:true
})



module.exports = mongoose.model("Category",categoryModel)