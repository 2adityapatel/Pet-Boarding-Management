const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  description: String,
  address: String
}, { timestamps: true });

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;