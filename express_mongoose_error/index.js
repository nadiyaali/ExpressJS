const express = require("express")
const app = express()
const path= require("path")
const mongoose = require("mongoose")
const port = 3000
const Product = require("./models/product.js")
const methodOverride = require("method-override")
const { findByIdAndUpdate } = require("./models/product.js")
const categories = ["fruit","vegetable","dairy","baked goods"]
// Impelenting error handling
const AppError = require("./AppError.js")




mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
.then(()=>{
    console.log("Mongo Connection open!!")
})
.catch( err =>{
    console.log("Oh No Mongo ERROR !!!!")
    console.log(err)
})


app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))
// add ?_method=PUT to submit url
app.use(methodOverride("_method"))


app.listen(port, ()=>{
    console.log("Listening on Port 3000")
})

// this middleware will now do error handling since it has the err object passed to it
// for async functions, you have to add try catch
//or call a function which does that
//try{
//}catch(e){
// next(e)
//}
function wrapAsync(fn){
    return function(req,res,next){
        console.log("^^^^^^^^^^^^^^^ async error handlers ^^^^^^^^^^^^^^^^^^^")
        fn(req,res,next).catch(e => next(e))
    }
}



app.use((err,req,res,next)=>{
    console.log("************************************")
    console.log("****************Error***************")
    console.log("************************************")
   
    next(err)
})





app.get("/products/geterror", (req,res)=>{
      
    //for checking 
    throw new AppError("My Error : I threw this error", 401)
    
})


// get all products
app.get("/products", wrapAsync(async (req,res,next)=>{
    const {category} = req.query
    if(category){
        console.log(category)
        const productList = await Product.find({category:category})
        res.render("products/index.ejs",{productList, category})
    }
    else{
    const productList = await Product.find({})   
    //console.log(productList)
    //res.send("App product list is on its way")
    res.render("products/index.ejs",{productList, category:"All"})
    }
}))

// get form for new product
app.get("/products/new", (req,res) => {
    console.log("New product page")
    res.render("products/new.ejs",{categories})
})


// get one product by id
app.get("/products/:id", wrapAsync(async (req,res, next) =>{
     const { id } = req.params
    const foundProduct = await Product.findById(id) 
    //console.log(foundProduct)
    //res.send(foundProduct)
   if(!foundProduct){
        throw new AppError("Product sold out!", 401)
   }
    
    res.render("products/details.ejs",{foundProduct})
}))

// the form info is in req.body but is undefines, u need to parse it to get the actual values 
// add new product
app.post("/products", wrapAsync(async (req,res, next) =>{
    console.log(req.body)
    const newProduct = new Product(req.body)
    await newProduct.save()
    console.log(newProduct)
    //res.send("Product added to database")
    res.redirect(`/products/${newProduct.id}`)
}))

// update product
app.get("/products/:id/edit", wrapAsync(async (req,res, next) =>{
    const { id } = req.params
    const foundProduct = await Product.findById(id) 
    res.render("products/edit.ejs",{foundProduct, categories})
}))

// Put request will replace all the values of the item in db
//Patch request can replace only some values, e.g price only
// npm install method-override to use this put request
//because the form can only submit POST
app.put("/products/:id", wrapAsync(async (req,res, next) =>{
    console.log(req.body)
    const { id } = req.params
    // add runValidators to enforce validation on new data
    const updateProduct = await Product.findByIdAndUpdate(id, req.body,{runValidators:true, new:true})
    res.redirect(`/products/${updateProduct._id}`)
}))

//Delete a  product
app.delete("/products/:id", wrapAsync(async (req,res, next) =>{
    const { id } = req.params
    const deletedProduct = await Product.findByIdAndDelete(id)
    //res.send("Product deleted")
    res.redirect("/products")
}))