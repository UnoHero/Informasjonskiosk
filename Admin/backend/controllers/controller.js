require('dotenv').config({path: "../../.env"})

const kioskModel = require("../models/dataModel");
const pageModel = require("../models/pageModel");
const playerModel = require("../models/playerModel")

const mongoose = require("mongoose");

const createTrue = async (req, res) => {
    const { value } = req.body;
    try {
        const createDoc = await kioskModel.create({ value });
        res.status(200).send(createDoc);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};


const getSwgoh = async (req, res) => {
    try {
        let result = []
        const response = await fetch("https://swgoh.gg/api/characters/");
        const data = await response.json();
        
        data.forEach(e => {
            if (e.alignment == "Light Side") {
                delete e.gear_levels
                result.push(e)
            }
        });
        console.log(result);
        res.json(result)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getCoC = async (req, res) => {

    const name = req.params.name

    try {
        let result = [];

        const gamer = await playerModel.findOne({ name: name });
        console.log(gamer);
        let cocId = gamer.coc;

        const token = process.env.CoC;

        const response = await fetch(`https://api.clashofclans.com/v1/players/%23${cocId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        // Check if 'heroes' array is defined before mapping
        const filteredHeroes = data.heroes ? data.heroes.map(({ equipment, maxLevel, ...restOfHero }) => restOfHero) : [];

        // Exclude specific properties from the data object
        const { role, warPreference, warStars, attackWins, defenseWins, donations, achievements, playerHouse, troops, spells, heroEquipment, heroes, ...restOfData } = data;

        // Combine the filtered heroes with the rest of the data
        const filteredData = { ...restOfData, heroes: filteredHeroes };

        result.push(filteredData);

        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const Weather = async (req, res) => {
    try {

        let result = [];

        const response = await fetch("")

        const data = await response.json();

        result.push(data)

        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const players = async (req, res) => {
    try {
        const gamers = await playerModel.find();

        // Filter players who have the 'coc' property
        const playersWithCoc = gamers.filter(player => player.coc);

        // Extracting only the names from each filtered player object
        const result = playersWithCoc.map(player => player.name);

        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const spesPlayer = async (req, res) => {
    const name = req.params.name;
    try {
        const gamer = await playerModel.findOne({ name: name });
        console.log(gamer);

        if (gamer) {
            console.log(gamer);
            let cocId = gamer.coc;

            res.status(200).json(cocId);
        } else {
            // Player not found
            res.status(404).json({ error: 'Player not found' });
        }
        
    } catch (error) {
        // Handle other errors
        res.status(400).json({ error: error.message });
    }
};

const allSlides = async (req, res) => {
    try {
        const slides = await pageModel.find();

        if (slides) {
            console.log(slides);
            res.status(200).json({slides})
        } else {
            res.status(404).json({ error: error.message})
        }
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const oneSlide = async ( req, res ) => {
    const slideOrder = req.params.num;
    try {
        const slide = await pageModel.findOne({ order: slideOrder})

        if (slide) {
            res.status(200).json(slide)
        } else {
            res.status(404).json({ error: error.message})
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const updateSlide = async ( req, res ) => {
    const slideOrder = req.params.num;
    const updateData = req.body;
    try {
        const updatedSlide = await pageModel.findOneAndUpdate({ order: slideOrder}, updateData, { new: true});

        if (slide) {
            res.status(200).json(updatedSlide)
        } else {
            res.status(404).json({ error:'Slide not found' })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createTrue,
    getSwgoh,
    getCoC,
    players,
    spesPlayer,
    allSlides,
    oneSlide,
    updateSlide
};
