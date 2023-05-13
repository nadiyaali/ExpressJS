// npm install express-session
const express =require("express")
const app = express()
const session = require("express-session")

//BASIC WAY
//this will create a connect.sid cookie keeping track of session
//app.use(session({secret:"thisisnotagoodsecret"}))

//ADVANCED WAY, to stop all the deprecated warnings
const sessionOptions = {secret:"thisisnotagoodsecret", resave:false, saveUninitialized:false}
app.use(session(sessionOptions))


app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})

app.get("/viewcount", (req,res)=>{
    if(req.session.count){
        req.session.count +=1
    }
    else{
        req.session.count = 1
    }
    res.send(`You have viewed this page ${req.session.count} times`)
})

app.get("/register",(req,res)=>{
    //the query string should contain a username, else the default value
    //http://localhost:3000/register?username=nadia
    const{username="Anonymous"} = req.query
    req.session.username = username
    res.send(`You username is ${username}`)
})

app.get("/greet", (req,res)=>{
    const {username} = req.session
    if(username){
        res.send(`Welcome back, ${username} !`)
    }
    else{
        res.send("Welcome back" )
    }
})


//redis can bu sued for session store
//or connect-mongo session can be used