import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [processingTurfId, setProcessingTurfId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const loadRazorpayScript = async () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (turf) => {
    if (!turf.selectedDate || !turf.selectedSlot) {
      alert("❌ Date and Time are missing for this booking!");
      return;
    }

    console.log("📢 Sending turfId:", turf.turfId);
    setProcessingTurfId(turf.turfId);

    if (!turf.turfId) {
      alert("❌ Turf ID is missing!");
      return;
    }

    console.log("Sending Payment Request:", { date: turf.selectedDate, time: turf.selectedSlot });

    try {
      const response = await axios.post(
        `http://localhost:5000/payment/create-order/${turf.turfId}`,
        { date: turf.selectedDate, time: turf.selectedSlot }
      );

      if (response.status === 202) {
        alert("⏳ Someone is currently booking this slot. Try again in a few minutes!");
      } else {
        handleRazorpayPayment(response.data.order, turf);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("❌ This slot is already booked!");
      } else {
        console.error("❌ Payment Error:", error);
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setProcessingTurfId(null);
    }
  };

  const handleRazorpayPayment = async (order, turf) => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("❌ Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_4CeBlPbW3VhK7J",
      amount: order.amount,
      currency: "INR",
      name: "Turf Booking",
      description: "Payment for turf booking",
      order_id: order.id,
      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id } = response;
        try {
          const res = await axios.post("http://localhost:5000/payment/payment-success", {
            razorpay_order_id,
            razorpay_payment_id,
            turfId: turf.turfId,
            date: turf.selectedDate,
            time: turf.selectedSlot,
          });

          if (res.data.success) {
            alert("🎉 Payment Successful!");
            const updatedCart = cart.filter((t) => t.turfId !== turf.turfId);
            setCart(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            navigate("/payment-success");
          } else {
            alert("❌ Payment failed, please contact support.");
          }
        } catch (error) {
          console.error("❌ Payment verification error:", error);
          alert("❌ Something went wrong during payment verification.");
        }
      },
      prefill: {
        name: "User Name",
        email: "user@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        minHeight: "100vh",
        backgroundImage:
          "url(https://t4.ftcdn.net/jpg/10/46/08/67/240_F_1046086719_7cJ6jfCat10EQKRVmO6fQ9RQVZgdrmXT.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((turf, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                backgroundColor: processingTurfId === turf.turfId ? "#ccc" : "#f9f9f9",
              }}
            >
              <Typography variant="h6">{turf.name}</Typography>
              <Typography variant="body2">📍 {turf.location}</Typography>
              <Typography variant="body2">💰 ₹{turf.pricePerHour}/hr</Typography>
              <Typography variant="body2" fontWeight="bold" color="green">
                ⏰ Booked Slot:{" "}
                {turf.selectedDate ? new Date(turf.selectedDate).toLocaleDateString() : "No Date Selected"}{" "}
                {turf.selectedSlot ? ` - ${turf.selectedSlot}` : " - No Time Selected"}
              </Typography>

              <button
                onClick={() => removeFromCart(index)}
                disabled={processingTurfId === turf.turfId}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                  opacity: processingTurfId === turf.turfId ? 0.5 : 1,
                  marginRight: "10px",
                }}
              >
                Remove
              </button>

              <button
                onClick={() => handlePayment(turf)}
                disabled={processingTurfId === turf.turfId}
                style={{
                  padding: "10px 15px",
                  backgroundColor: processingTurfId === turf.turfId ? "#999" : "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: processingTurfId === turf.turfId ? "not-allowed" : "pointer",
                }}
              >
                {processingTurfId === turf.turfId ? "Processing..." : "Continue Booking"}
              </button>
            </div>
          ))}
          <Link
            to="/turf"
            style={{
              display: "block",
              marginTop: "20px",
              textDecoration: "none",
              color: "#fff", // Text color inside the box
              backgroundColor: "#007bff", // Blue background
              padding: "9px 9px", // Padding inside the box
              borderRadius: "4px", // Rounded corners
              textAlign: "center", // Center the text
              width: "fit-content", // Box width adjusts to the content size
              margin: "0 auto", // Center it horizontally
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optional: Adds shadow for depth
            }}
          >
            Back to Turf Selection
          </Link>
        </>
      )}
    </div>
  );
}
