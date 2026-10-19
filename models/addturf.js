const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import UUID for unique turfId

const turfSchema = new mongoose.Schema({
  turfId: { type: String, unique: true, default: uuidv4 }, // Generate unique ID
  name: { type: String, required: true },
  location: { type: String },
  pricePerHour: { type: Number, required: true },
  availableSlots: { type: [String], required: true }, // Example: ["2025-03-12 - 10:00 AM to 11:00 AM"]
  imageUrl: { type: String},
  adminId: { type: String, required: true },
  availableDates: [{ type: Date, required: true }]
  , 
});

const Turf = mongoose.model("Turfs", turfSchema);
module.exports = Turf;
