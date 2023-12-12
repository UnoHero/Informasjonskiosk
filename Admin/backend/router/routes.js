 const express = require("express")

 const router = express.Router()

 router.get("/", (req, res) => {
    res.json({mssg:"working"})
 })

 router.post("/", (req, res) => {
    res.json({mssg: "Post"})
 })
 
 module.exports = router