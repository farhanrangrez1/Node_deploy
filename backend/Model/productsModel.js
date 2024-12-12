const mongoose = require("mongoose")

const productsModel =new mongoose.Schema({
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
        required : [true,"Images required"]
    },
    unit_price:{
        type: String,
        required : [true,"unit_price required"]
    },
    purchase_price:{
        type: String,
        required : [true,"purchase_price required"]
    },
     description:{
        type: String,
        required : [true,"description required"]
    },
    product_code:{
        type: String,
        required : [true,"product_code required"]
    },
    tax_percent:{
        type: String,
        required : [true,"tax_percent required"]
    },
    tax_Model:{
        type: String,
        required : [true,"tax_percent required"]
    },
    discount_type:{
        type: String,
        required : [true,"discount_type required"]
    },
     total_Quantity:{
        type: String,
        required : [true,"total_Quantity required"]
    },
    minimum_order_quantity:{
        type: String,
        required : [true,"minimum_order_quantity required"]
    },
    shippin_cost:{
        type: String,
        required : [true,"shippin_cost required"]
    },
    product_type:{
        type: String,
        required : [true,"product_type"]
    },
    active_status: {
        type: Number,
        required: true,
        default: 1,
        validate: {
            validator: function(value) {
                return value === 0 || value === 1;
            },
            message: 'active_status must be either 1 (active) or 0 (inactive)'
    }},
    category_name:{
        type: String,
        required : [true,"category_name required"]
    },
    sub_category_name:{
        type: String,
        required : [true,"sub_category_name required"]
    },
    brand_name:{
        type: String,
        required : [true,"brand_name required"]
    },
},{
    timeseries:true
})

module.exports = mongoose.model("Products",productsModel)