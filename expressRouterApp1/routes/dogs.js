const express = require("express")
const router = express.Router()

router.get("/dogs", (req,res)=>{
    res.send("These are all the dogs")    
})

router.get("/dogs/:id", (req,res)=>{
    res.send("This is one dog by ID")    
})

router.get("/dogs/:id/edit", (req,res)=>{
    res.send("This is editing one dog by ID")    
})

module.exports = router
