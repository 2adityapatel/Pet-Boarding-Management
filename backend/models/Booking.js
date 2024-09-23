
const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet',
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userprofile',
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled','rejected', 'completed'],
      default: 'pending'
    },
    specialRequirements: String,
    facilityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Facility',
      required: true
    }
  }, { timestamps: true });
  
  const Booking = mongoose.model('Booking', bookingSchema);
  
  module.exports = Booking;