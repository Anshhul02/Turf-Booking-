const express = require("express");
const Razorpay = require("razorpay");
const mongoose = require("mongoose");
require("dotenv").config();
const Turf = require("../models/addturf");
const Booking = require("../models/booking");

const router = express.Router();

// ✅ Ensure Razorpay API keys are loaded
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("❌ RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing. Check your .env file.");
  process.exit(1);
}

// ✅ Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Test GET Route
router.get("/payment/create-order/:turfId", async (req, res) => {
  res.json({ message: "GET Route Working" });
});

// ✅ Create Order & Temporarily Hold the Slot
router.post("/create-order/:turfId", async (req, res) => {
  try {
    const { date, time } = req.body;
    const { turfId } = req.params;

    console.log("📢 Checking availability for:", { turfId, date, time });

    // ✅ Check if the slot is already booked or in payment
    const existingBooking = await Booking.findOne({
      turfId,
      date,
      time,
      status: { $in: ["pending", "confirmed"] },
    });

    if (existingBooking) {
      if (existingBooking.status === "confirmed") {
        return res.status(409).json({
          success: false,
          message: "❌ Turf is already booked for this time slot!",
        });
      } else {
        return res.status(202).json({
          success: false,
          message: "⏳ Someone is currently booking this slot. Try again in a few minutes!",
        });
      }
    }

    // ✅ Create a "Pending" Booking (Temporary Hold)
    const newBooking = new Booking({
      turfId,
      date,
      time,
      status: "pending",
    });
    await newBooking.save();

    // ✅ Fetch Turf & Create Razorpay Order
    const turf = await Turf.findOne({ turfId: turfId });
    if (!turf) {
      return res.status(404).json({ success: false, message: "Turf not found" });
    }

    const amount = turf.pricePerHour * 100;
    const options = {
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    console.log("✅ Razorpay Order Created:", order);

    if (!order) {
      return res.status(500).json({ success: false, message: "Error creating Razorpay order." });
    }

    // ✅ Auto-release pending booking if payment isn't completed
    setTimeout(async () => {
      const pendingBooking = await Booking.findOne({ _id: newBooking._id, status: "pending" });
      if (pendingBooking) {
        await Booking.deleteOne({ _id: newBooking._id });
        console.log("⏳ Pending booking auto-released:", newBooking._id);
      }
    }, 10 * 60 * 1000); // 10 minutes timeout

    res.status(200).json({ success: true, order, amount });
  } catch (error) {
    console.error("❌ Error creating order:", error);
    res.status(500).json({ success: false, message: "Error creating order", error: error.message });
  }
});

// ✅ Payment Success - Confirm Booking (Signature Removed)
// ✅ Payment Success - Confirm Booking (Signature Removed)
router.post("/payment-success", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, turfId, date, time } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !turfId || !date || !time) {
      return res.status(400).json({ success: false, message: "Missing payment details" });
    }

    console.log("📢 Payment Successful for:", { razorpay_order_id, razorpay_payment_id, turfId, date, time });

    // 🚀 Skipping Signature Verification in Test Mode

    // ✅ Find & Confirm the Booking
    const booking = await Booking.findOneAndUpdate(
      { turfId, date, time, status: "pending" },
      { status: "confirmed" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found or already taken!" });
    }

    // ✅ Mark Turf as "Booked"
    await Turf.findOneAndUpdate({ turfId }, { bookingStatus: "booked" });

    res.json({ success: true, message: "✅ Payment successful, turf booked!" });
  } catch (error) {
    console.error("❌ Error processing payment:", error);
    res.status(500).json({ success: false, message: "Error processing payment" });
  }
});


module.exports = router;
