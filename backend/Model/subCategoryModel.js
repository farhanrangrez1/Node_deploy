const mongoose = require("mongoose")


const subCategoryModel =new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
      },
   
    subName:{
        type:String,
        required:[true,"name required"]
    },
    number:{
     type:String,
     required: [true,"Number required"]
    },
    images :{
        type: String,
        required : [true,"Please add Images"]
    },
},{
    timeseries:true
})


// module.exports = mongoose.models.SUBcategory || mongoose.model('SUBcategory',subCategoryModel);
module.exports = mongoose.model("SUBcategory",subCategoryModel)