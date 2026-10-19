import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Card, CardContent } from "@mui/material";

export default function ViewBookings() {
  const [bookings, setBookings] = useState([]); // 👈 Ensure default is an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/booking");
        console.log("📢 API Response:", response.data); // Debug log

        if (Array.isArray(response.data)) {
          setBookings(response.data); // ✅ Ensure it's an array
        } else {
          setBookings([]); // ❌ API returned something else, fallback to empty array
        }
      } catch (err) {
        console.error("❌ Fetching Error:", err);
        setError("Failed to load bookings.");
        setBookings([]); // ❌ Ensure fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <Container style={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        📅 All Bookings
      </Typography>

      {loading && <Typography>⏳ Loading bookings...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && bookings.length === 0 && <Typography>No bookings found.</Typography>}

      {Array.isArray(bookings) &&
        bookings.map((booking) => (
          <Card key={booking._id} style={{ margin: "10px 0", padding: "10px" }}>
            <CardContent>
              <Typography variant="h6">🏟 {booking.turfId?.name || "Unknown Turf"}</Typography>
              <Typography>📅 {booking.date}</Typography>
              <Typography>⏰ {booking.timeSlot}</Typography>
            </CardContent>
          </Card>
        ))}
    </Container>
  );
}
