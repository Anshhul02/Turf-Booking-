const mongoose = require("mongoose");

const SendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // Image filename (assuming image is stored in 'uploads' folder)
    required: true,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true, // To track which admin added this turf
  },
});

const Send = mongoose.model("Send", SendSchema);
module.exports = Send;
