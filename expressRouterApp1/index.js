const express = require("express")
const app = express()
const port = 3000
const shelterRoutes = require("./routes/shelter.js")
const dogRoutes = require("./routes/dogs.js")
const adminRoutes = require("./routes/admin.js")

// http://localhost:3000/admin/topsecret?isAdmin=true
app.use("/admin", adminRoutes)
app.use("/shelters", shelterRoutes)
app.use("/", dogRoutes)



app.listen(port, () =>{
    console.log(`Listening on port :${port}`)
})


