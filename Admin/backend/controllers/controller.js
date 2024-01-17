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
    try {
        let result = [];

        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjI3ZmYwZTA2LWRjZTMtNGZkMC1iNTM4LTAzOTU2ODIwZTY0YSIsImlhdCI6MTcwNTQ5MjM5Nywic3ViIjoiZGV2ZWxvcGVyLzQwODZmYjZjLTY5YmEtNjYwZS04ZDI3LTBhYTJlYmYzZTBjMyIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE1NS41NS41MS4yMjAiXSwidHlwZSI6ImNsaWVudCJ9XX0.u7QGt_3NaX8zvVwUJCi-S3ZeFXJmndexPi9mARPSWhJ3dmOyFAwryKy-IkP4alZ6OwQEvM-RxuLA_hyj9NR2Ug';

        const response = await fetch("https://api.clashofclans.com/v1/players/%232C8V28JUY", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        console.log(data);
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    createTrue,
    getSwgoh,
    getCoC
};
