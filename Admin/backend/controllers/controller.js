const Model = require("../models/dataModel");
const mongoose = require("mongoose");

const createTrue = async (req, res) => {
    const { value } = req.body;
    try {
        const suppe = await Model.create({ value });
        res.status(200).send(suppe);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};

module.exports = {
    createTrue
};
