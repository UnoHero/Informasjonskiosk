const mongoose = require('mongoose')

const Schema = mongoose.Schema

const kioskModel = new Schema({
  value: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('media', kioskModel)