const express = require("express")
const app = express()
const port = 8080

app.listen(port, ()=>{
    console.log("Server is listening")
})
app.get("/",(req,res)=>{
    
    res.send(`This is the homepage`)
})

app.post("/add",(req,res)=>{
    let answer = 10
    res.send(`Addition answer is ${answer}`)
})

app.get("/add",(req,res)=>{
    let answer = 10
    res.send(`Addition answer is ${answer}`)
})

app.get("/sub",(req,res)=>{
    let answer = 10
    res.send(`ubtract answer is ${answer}`)
})

//pattern matching
app.get("/r/:subtopic", (req,res)=>{
    console.log(req.params)
    // to get the subtopic variable
    const { subtopic } = req.params 
    res.send(`This page is a subtopic ${subtopic}`)
})


app.get("/r/:subtopic/:topicname", (req,res)=>{
    console.log(req.params)
    const { subtopic, topicname } = req.params
    res.send(`This page shows the subtopic ${subtopic} and topic name ${topicname}`)
})

// for query string
app.get("/search", (req,res)=>{
    console.log(req.query)
    const { q } = req.query
    //can be done for multiple serach terms too
    //const { q , name } = req.query
    console.log(q)
    //comsole.lof(name) 
    if(!q){
        res.send("Nothing found if nothing searched")
    }
    else{
    res.send(`Searching for the query term ${q}`)
    }
})



/* This should be the last one*/
app.get("*",(req,res)=>{
    
    res.send(`I dont know this path`)
})