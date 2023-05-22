
const express = require("express")
const router = express.Router()

router.get("/", (req,res) =>{
    res.send("These are all the shelters")
})

router.get("/:id", (req,res) =>{
    res.send("This is shleter by ID")
})

router.get("/:id/edit", (req,res) =>{
    res.send("This is editing shelter by ID")
})

module.exports = router
