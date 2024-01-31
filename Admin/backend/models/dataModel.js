const mongoose = require('mongoose')

const Schema = mongoose.Schema

const kioskModel = new Schema({
  value: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  coc: {
    type: String,
  },
  swgoh: {
    type: String,
  },
}, { timestamps: true })

module.exports = mongoose.model('media', kioskModel)