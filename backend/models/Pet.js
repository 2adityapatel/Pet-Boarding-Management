const mongoose = require("mongoose");
const medicalRecordSchema = new mongoose.Schema({
  recordType: String,
  date: Date,
  description: String,
  veterinarian: String,
  filePath: String,
});
const petSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userprofile",
      required: true,
    },
    name: { type: String, required: true },
    species: String,
    breed: String,
    age: Number,
    weight: Number,
    gender: String,
    microchipNumber: String,
    medicalRecords: [medicalRecordSchema],
  },
  { timestamps: true }
);
const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;
