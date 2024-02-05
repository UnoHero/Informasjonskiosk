const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pageModel = new Schema({
    type: {
      type: String,
      required: true
    },
    value: {
      type: String,
    },
    order: {
      type: Number,
    },
    show: {
      type: Boolean,
    }
  
  })

module.exports = mongoose.model('slide', pageModel)
