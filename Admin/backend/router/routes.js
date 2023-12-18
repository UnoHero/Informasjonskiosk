 const express = require("express")
 const {createTrue} = require("../controllers/controller")

 const router = express.Router()

 router.get("/", (req, res) => {
    res.json({mssg:"working"})
 })

 router.post('/api/updateData', createTrue)
 
 module.exports = router