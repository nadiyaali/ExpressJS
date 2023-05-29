// USES BOOTSTRAP
// download compiles bootstrap from
//https://getbootstrap.com/docs/5.2/getting-started/download/
//unzip it and put bootstrap.min.js file in js folder and bootstrap.min.css in css folder in public folder

//Also needs jquery, go to website
//https://code.jquery.com/jquery-3.6.3.min.js
// get the compiles compressed version, copy paste it in jquery.js file in js folders
const express = require("express")
const app = express()
const port = 3000
const path = require("path")

// set path for view folder
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))   

// set the path for public folder, that contains statis files to be served
app.use(express.static(path.join(__dirname,"/public")))

//get data from file
const topicData = require("./data.json")
console.log(topicData)


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})

app.get("/", (req,res)=>{
    res.send("Hello from server")
})

app.get("/rand", (req,res)=>{
    const num = Math.floor(Math.random()*20)+1
    res.render("rand.ejs", {num})
})


app.get("/rr/:topic", (req,res)=>{
    const { topic } = req.params
    const data = topicData[topic]
    //res.send(data)
    //data could be passed as whole object data, use data.name, data.descriptions
    if(data){
    res.render("reddit.ejs", {...data})
    }
    else{
        res.send("Topic not found")
    }

})
