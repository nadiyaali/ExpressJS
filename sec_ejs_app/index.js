const express = require("express")
const app = express()
const path = require("path")
const port = 8080
//get data from file
const topicData = require("./data.json")
console.log(topicData)

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})

app.set("view engine", "ejs")
app.set("views", path.join(__dirname,"/views"))


app.get("/", (req,res)=>{
    res.send("Hello from server")
  })


app.get("/random", (req,res)=>{
    //res.send("Hello from server")
    const num = Math.floor(Math.random()*20)+1
    //both ways work
    //res.render("rand.ejs", {rand:num})
    res.render("rand.ejs", {rand})
})

app.get("/r/:topic", (req,res)=>{
    const { topic } = req.params
    res.render("topic.ejs",{topic})
})

app.get("/rr/:topic", (req,res)=>{
    const { topic } = req.params
    const data = topicData[topic]
    //res.send(data)
    //data could be passed as whole object data, use data.name, data.descriptions
    if(data){
    res.render("topic2.ejs", {...data})
    }
    else{
        res.send("Topic not found")
    }

})


app.get("/random2",(req,res)=>{
    const num = Math.floor(Math.random()*30)+1
    res.render("rand2.ejs",{num})
})


app.get("/cats",(req,res)=>{
    const cats = ["Amna","Minaal","Nadia","Omair","Aniqua"]
    res.render("cats.ejs",{ cats })
})

// to serve static files in express
//
//app.use(express.static("public"))
app.use(express.static(path.join(__dirname,"/public")))
// add this to the html files, no need for folder name, the whole folder is serveds
// <link rel="stylesheet" href="/app.css">