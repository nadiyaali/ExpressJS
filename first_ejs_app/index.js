const express = require("express")
const app = express()
const path = require("path")
const port = 3000

app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
})


app.set("view engine", "ejs")
//start node and check process.cwd()
//this path join is required to run index.js from outside the project folder
app.set("views", path.join(__dirname,"/views"))




app.get("/", (req,res)=>{
    //res.send("Hi from server")
    res.render("home.ejs")
})