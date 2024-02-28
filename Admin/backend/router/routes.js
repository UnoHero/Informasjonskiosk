const express = require("express");
const {
createTrue, 
getSwgoh, 
getCoC, 
players, 
spesPlayer, 
allSlides, 
oneSlide, 
updateSlide
} = require("../controllers/controller");
const requireAuth = require("../middleware/requireAuth")


const router = express.Router();

// auth for routes
router.use(requireAuth)

router.get("/", (req, res) => {
   res.json({mssg:"working"})
});

router.get("/swgoh", getSwgoh);

router.get("/CoC/:name", getCoC);

router.post('/updateData', createTrue);

router.get("/players", players);
router.get("/player/:name", spesPlayer);

router.get("/pages", allSlides);
router.get("/page/:num", oneSlide);
router.patch("/page/:num", updateSlide); 

module.exports = router