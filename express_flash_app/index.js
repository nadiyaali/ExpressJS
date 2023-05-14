const express = require("express")
const app = express()
const path= require("path")
const mongoose = require("mongoose")
const port = 3000
const Product = require("./models/product.js")
const methodOverride = require("method-override")
const { findByIdAndUpdate } = require("./models/product.js")
const categories = ["fruit","vegetable","dairy","baked goods"]

// for session
const session = require("express-session")
//for flash
//npm install connect-flash
const flash =require("connect-flash") 
const sessionOptions={secret:"thisisnotagoodsecret",resave:false,saveUninitialized:true}
app.use(session(sessionOptions))
app.use(flash())
//for flash there are many steps
//0.implement sessions
//1.require
//2.app.use
//3. put in get request before redirect
//req.flash("success", "Adding the new product in database")
//4.Add in to res.sender list
//res.render("products/index.ejs",{productList, category, messages:req.flash("success")})
//5. Add in ejs template page
//<%= messages%> 
// OR ADD IN A MIDDLEWARE FUNCTION

app.use((req,res,next)=>{
    res.locals.messages = req.flash("success")
    next()
})

mongoose.connect('mongodb://127.0.0.1:27017/farmStandFlash')
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

// get all products
app.get("/products",async (req,res)=>{
   const {category} = req.query
    if(category){
        console.log(category)
        const productList = await Product.find({category:category})
        //res.render("products/index.ejs",{productList, category, messages:req.flash("success")})
        res.render("products/index.ejs",{productList, category})
    
    }
    else{
    const productList = await Product.find({})   
    //console.log(productList)
    //res.send("App product list is on its way")
    //res.render("products/index.ejs",{productList, category:"All", messages:req.flash("success")})
    res.render("products/index.ejs",{productList, category:"All"})
        
    }
})

// get form for new product
app.get("/products/new", (req,res) => {
    console.log("New product page")
    res.render("products/new.ejs",{categories})
})


// get one product by id
app.get("/products/:id", async (req,res) =>{
    const { id } = req.params
    const foundProduct = await Product.findById(id) 
    //console.log(foundProduct)
    //res.send(foundProduct)
    //2nd step for flash
    //res.render("products/details.ejs",{foundProduct, messages:req.flash("success")})
    res.render("products/details.ejs",{foundProduct})

})

// the form info is in req.body but is undefines, u need to parse it to get the actual values 
// add new product
app.post("/products", async (req,res) =>{
    console.log(req.body)
    const newProduct = new Product(req.body)
    await newProduct.save()
    console.log(newProduct)
    //res.send("Product added to database")
    //before redirect
    // 1st step for flash
    req.flash("success", "Adding the new product in database")
    
    res.redirect(`/products/${newProduct.id}`)
})

// update product
app.get("/products/:id/edit", async (req,res) =>{
    const { id } = req.params
    const foundProduct = await Product.findById(id) 
    res.render("products/edit.ejs",{foundProduct, categories})
})

// Put request will replace all the values of the item in db
//Patch request can replace only some values, e.g price only
// npm install method-override to use this put request
//because the form can only submit POST
app.put("/products/:id", async (req,res) =>{
    console.log(req.body)
    const { id } = req.params
    // add runValidators to enforce validation on new data
    const updateProduct = await Product.findByIdAndUpdate(id, req.body,{runValidators:true, new:true})
    res.redirect(`/products/${updateProduct._id}`)
})

//Delete a  product
app.delete("/products/:id", async (req,res) =>{
    const { id } = req.params
    const deletedProduct = await Product.findByIdAndDelete(id)
    //res.send("Product deleted")
    res.redirect("/products")
})