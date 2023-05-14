const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    category:{
        type:String,
        lowercase:true,
        enum:["fruit","vegetable","dairy","baked goods"]
    }

})

const Product = mongoose.model("Product",productSchema)
module.exports = Product