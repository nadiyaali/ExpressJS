const express = require("express")
const app = express()
const port = 8080
const morgan = require("morgan")

app.use(morgan("common"))
//morgan("dev")
//morgan("tiny")
//morgan("common")


//Making our own middleware, have to include next
app.use((req,res,next) =>{
    console.log("This is my first middleware")
    return next()
})

app.use((req,res,next) =>{
    console.log("This is my second middleware")
     return next()
})



app.use("/dogs",(req,res,next) =>{
    console.log("This middleware only runs for /dogs path")
     return next()
})

// this middleware runs before get request and handles unknown path error
//Errors have 400 and 500 status code

app.use((req,res) =>{
    res.status(404).send("Sorry, could not find the given route")
})



const verifyPassword = (req,res,next) =>{
    const {password} = req.query
    if(password === "nuggets"){
        next()
    }
    //res.send("SORRY, YOU NEED A PASSWORD")
    throw new Error("Hey, where is the password?")
}


app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`)

})


app.get("/dogs", (req,res)=>{
    console.log("Woof Woof from dogs route")
    res.send("Woof Woof from dogs route")
})

app.get("/cats", (req,res)=>{
    console.log("Meow Meow from cats route")
    console.log(`My Date : ${req.myDate}`)
    res.send("Meow Meow from cats route")
})

//wil only work for 
//http://localhost:8080/secret?password=nuggets
app.get("/secret",verifyPassword, (req,res)=>{
    
    res.send("Secret is blah blah blah blah")
})

app.get("/", (req,res)=>{
    console.log("Hello from main route")
    res.send("Hello from main route")
})


