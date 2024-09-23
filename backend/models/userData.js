const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  phoneNumber: String,
  address: String,
  userType: { type: String, enum: ['petOwner', 'admin'], default: 'petOwner' }
}, { timestamps: true });

const UserProfile = mongoose.model('userprofile', userSchema);

module.exports = UserProfile;