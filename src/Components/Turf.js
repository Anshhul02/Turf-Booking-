import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Slider,
  Container,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";

const Turf = () => {
  const [turfs, setTurfs] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(1400);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/turfs");
        setTurfs(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch turfs.");
        setTurfs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTurfs();
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const addToCart = (turf) => {
    if (!turf.selectedDate || !turf.selectedSlot) {
      alert("Please select a date and time slot before adding to cart.");
      return;
    }
    const updatedCart = [...cart, { ...turf }];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("✅ Added to cart successfully!");
  };

  const handleDateSelection = (turfId, date) => {
    setTurfs((prevTurfs) =>
      prevTurfs.map((t) =>
        t._id === turfId ? { ...t, selectedDate: date, selectedSlot: null } : t
      )
    );
  };

  const handleSlotSelection = (turfId, slot) => {
    setTurfs((prevTurfs) =>
      prevTurfs.map((t) => (t._id === turfId ? { ...t, selectedSlot: slot } : t))
    );
  };

  const filteredTurfs = turfs.filter(
    (turf) =>
      turf.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      turf.pricePerHour <= priceRange
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url(https://t4.ftcdn.net/jpg/10/46/08/67/240_F_1046086719_7cJ6jfCat10EQKRVmO6fQ9RQVZgdrmXT.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        padding: "20px",
      }}
    >
      <Container component="main" maxWidth="lg">
        <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" fontWeight="bold">
            Turf Booking
          </Typography>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <Button variant="contained" sx={{ backgroundColor: "#ff9800", color: "#fff" }}>
              Cart ({cart.length})
            </Button>
          </Link>

          {/* Search & Price Filter */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <TextField
              label="Search for turfs..."
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: "300px", marginRight: "20px", backgroundColor: "#fff" }}
            />
            <Slider
              value={priceRange}
              onChange={(e, value) => setPriceRange(value)}
              min={1000}
              max={10000}
              step={50}
              valueLabelDisplay="auto"
              sx={{ color: "#28a745" }}
            />
            <Typography>Max Price: ₹{priceRange}/hr</Typography>
          </div>

          {/* Display Turfs */}
          {loading ? (
            <Typography align="center"><CircularProgress /></Typography>
          ) : error ? (
            <Typography align="center" color="error">{error}</Typography>
          ) : filteredTurfs.length === 0 ? (
            <Typography align="center" color="textSecondary">No turfs found.</Typography>
          ) : (
            <Grid container spacing={3}>
              {filteredTurfs.map((turf) => (
                <Grid item xs={12} sm={6} md={4} key={turf._id}>
                  <Card>
                    <img src={`http://localhost:5000${turf.imageUrl}`}
                      alt={turf.name}
                      style={{ width: "100%", height: "200px", objectFit: "cover" }}
                    />
                    <CardContent>
                      <Typography variant="h6">{turf.name}</Typography>
                      <Typography variant="body2">📍 {turf.location}</Typography>
                      <Typography variant="body2">💰 Price: ₹{turf.pricePerHour}/hr</Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>📅 Select a Date:</Typography>
                      {turf.availableDates?.map((date, i) => (
                        <Button key={i} variant={turf.selectedDate === date ? "contained" : "outlined"} onClick={() => handleDateSelection(turf._id, date)}>
                          {new Date(date).toLocaleDateString()}
                        </Button>
                      ))}
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>Available Slots:</Typography>
                      {turf.availableSlots?.map((slot, i) => (
                        <Button key={i} variant={turf.selectedSlot === slot ? "contained" : "outlined"} onClick={() => handleSlotSelection(turf._id, slot)}>
                          {slot}
                        </Button>
                      ))}
                      <Button variant="contained" onClick={() => addToCart(turf)} sx={{ backgroundColor: "#28a745", color: "#fff", marginTop: "10px" }} fullWidth>
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Turf;
