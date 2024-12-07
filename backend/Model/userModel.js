const mongoose = require("mongoose")


const userModel =new mongoose.Schema({
    customId: {
        type: Number,
        unique: true,
        required: true,
    },
    f_name:{
        type:String,
        required:[true,"name required"]
    },
    l_name:{
        type:String,
        required:[true,"name required"]
    },
    email:{
        type:String,
        required:[true,"email required"],
        unique:true
    },
    phone:{
        type:String,
        required:[true,"phone required"],
    },
    password:{
        type:String,
        required:[true,"password required"],
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
},{
    timeseries:true
})



module.exports = mongoose.model("User",userModel)