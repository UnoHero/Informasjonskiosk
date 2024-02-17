 const express = require("express");
 const {createTrue, getSwgoh, getCoC, players, spesPlayer, allSlides, oneSlide, updateSlide} = require("../controllers/controller");

 const router = express.Router();

 router.get("/", (req, res) => {
    res.json({mssg:"working"})
 });

 router.get("/swgoh", getSwgoh);

 router.get("/CoC/:name", getCoC);

 router.post('/api/updateData', createTrue);

 router.get("/api/players", players);
 router.get("/api/player/:name", spesPlayer);

 router.get("/pages", allSlides);
 router.get("/page/:num", oneSlide);
 router.patch("/page/:num", updateSlide); 


 module.exports = router