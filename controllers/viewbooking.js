const Booking = require("../models/booking"); // Import Booking model
const Turf = require("../models/addturf"); // Import Turf model

async function viewbooking(req, res) {
  try {
    const bookings = await Booking.find()
      .populate("turfId") // ✅ Correct way to populate
      .lean()
      .exec(); 

    console.log("📢 Retrieved Bookings:", bookings); // 🔥 Debugging log

    if (!Array.isArray(bookings) || bookings.length === 0) {
      return res.status(200).json([]); // ✅ Always return an empty array
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  viewbooking,
};
