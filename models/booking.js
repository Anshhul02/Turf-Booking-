const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  turfId: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["pending", "confirmed", "canceled"], 
    default: "pending" 
  }, // ✅ Track booking status
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
