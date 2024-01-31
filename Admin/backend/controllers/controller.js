require('dotenv').config({path: "../../.env"})

const Model = require("../models/dataModel");
const mongoose = require("mongoose");

const createTrue = async (req, res) => {
    const { value } = req.body;
    try {
        const createDoc = await Model.create({ value });
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
        if (e.alignment == "Dark Side") {
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

        const gamer = await Model.findOne({ name: name });

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

module.exports = {
    createTrue,
    getSwgoh,
    getCoC
};
