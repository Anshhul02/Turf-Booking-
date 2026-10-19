const bookingSchema = new mongoose.Schema({
    turfId: String,
    turfName: String,
    selectedSlot: String,
    price: Number,
    user: String, // Optional: If user authentication is added
    bookingDate: { type: Date, default: Date.now },
  });
  
  const Booking = mongoose.model("Booking", bookingSchema);