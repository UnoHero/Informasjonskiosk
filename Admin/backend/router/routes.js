 const express = require("express")
 const {createTrue, getSwgoh, getCoC} = require("../controllers/controller")

 const router = express.Router()

 router.get("/", (req, res) => {
    res.json({mssg:"working"})
 })

 router.get("/swgoh", getSwgoh)

 router.get("/CoC", getCoC)

 router.post('/api/updateData', createTrue)
 
 module.exports = router