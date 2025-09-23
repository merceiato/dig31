// dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-type-email')

// schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true
  },
  accessLevel: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

// create mongoose model
//add exact name at end coz sometimes the pluralisation doesnt work
const userModel = mongoose.model('User', userSchema, 'users')

// export
module.exports = userModel