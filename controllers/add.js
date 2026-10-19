const Turf = require("../models/addturf"); // Import Turf model
const mongoose = require("mongoose");

async function addturf(req, res) {
  try {
    let { name, adminId, pricePerHour, availableDates, location, availableSlots, image,imageUrl } = req.body;
    
    // Ensure availableDates is an array and convert to Date objects
    if (typeof availableDates === "string") {
      availableDates = JSON.parse(availableDates); // Convert from string to array
    }
    availableDates = availableDates.map(date => new Date(date)); // Convert each date

    // Ensure availableSlots is an array
    if (typeof availableSlots === "string") {
      availableSlots = JSON.parse(availableSlots);
    }

    const newTurf = new Turf({
      name,
      adminId,
      imageUrl: `/uploads/${req.file.filename}`,
      pricePerHour,
      availableDates,
      location,        // Added location field
      availableSlots,  // Added availableSlots field
      image,
    });

    await newTurf.save();
    res.status(201).json({ message: "Turf added successfully", turf: newTurf });
  } catch (error) {
    console.error("Error adding turf:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addturf };
