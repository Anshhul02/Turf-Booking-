import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎉 Payment Successful! 🎉</h1>
      <p>Thank you for your booking. Your payment has been processed.</p>
      <button onClick={() => navigate("/home")} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Go to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;
