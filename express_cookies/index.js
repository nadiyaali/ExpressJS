const express = require("express")
const app = express()
// npm install cookie-parser
const cookieParser = require("cookie-parser")
//app.use(cookieParser())
//Signed cookie, store the cookie secret in .env file, make sure .env file is mentioned in .git ignore
app.use(cookieParser("thisismysecret"))

app.get("/greet", (req,res)=>{
    const {name = "no-name"} = req.cookies
    res.send(`Hello ${name}`)
})

app.get("/setname", (req,res)=>{
   res.cookie("name","nadia")
   res.cookie("animal", "starfish")
    res.send("Your name has been set")
})


app.get('/setsignedcookies', function (req, res) {
  
    res.cookie("fruit", "custard apple", {signed:true})
    res.send("Signed cookie created")
})



app.get('/getsignedcookies', function (req, res) {
   // Cookies that have not been signed
   console.log('Cookies: ', req.cookies)

   // Cookies that have been signed
   console.log('Signed Cookies: ', req.signedCookies)
    res.send("see console")
})


app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})



