import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Paper } from "@mui/material";

const UserAuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "http://localhost:5000/login" : "http://localhost:5000/register";

    try {
      const response = await axios.post(endpoint, formData);
      setResponseMessage(response.data.message);

      if (response.status === 200 || response.status === 201) {
        if (isLogin) {
          localStorage.setItem("userToken", response.data.token);
        }
        navigate("/Home");
      }
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Section */}
      <div style={styles.leftSection}>
        <Typography variant="h3" style={styles.brandName}>
          TurfZone
        </Typography>
        <Typography variant="h6" style={styles.tagline}>
          Book your favorite sports turf easily and conveniently.
          <br />
          Premium turfs with top-notch facilities.
        </Typography>
        <div style={styles.qualities}>
          <div style={styles.qualityBox}>⚡ Instant Booking</div>
          <div style={styles.qualityBox}>🌍 Multiple Locations</div>
          <div style={styles.qualityBox}>✅ Verified Turfs</div>
          <div style={styles.qualityBox}>💰 Best Prices</div>
        </div>
      </div>

      {/* Right Section - Login/Register */}
      <div style={styles.rightSection}>
        <Paper elevation={3} style={styles.authCard}>
          <Typography variant="h5" style={styles.title}>
            {isLogin ? "User Login" : "Create an Account"}
          </Typography>
          <form onSubmit={handleSubmit} style={styles.form}>
            {!isLogin && (
              <TextField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            )}
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth style={styles.button}>
              {isLogin ? "Login" : "Register"}
            </Button>
          </form>
          {responseMessage && (
            <Typography color="error" style={styles.errorText}>
              {responseMessage}
            </Typography>
          )}
          <Typography variant="body2" style={styles.toggleText} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </Typography>
        </Paper>
      </div>
    </div>
  );
};

// Internal CSS
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundImage: "url('https://imgs.search.brave.com/f861Zw25iize_WKZzv-Ut6ZtwxGSJL4o1BO_TGaGwo0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI5/NDQwNzE4Mi9waG90/by9wbGF5aW5nLWZp/ZWxkLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz0xRjRBZG5I/Nk11eWM3Y0pLQjJo/NHl2Zm5STXhDbXpz/UTZ4Nkh1d252Vk93/PQ')", // Ensure the image is inside the public/images/ folder
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  leftSection: {
    flex: 1.5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px",
    color: "white",
  },
  brandName: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  tagline: {
    marginBottom: "20px",
  },
  qualities: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },
  qualityBox: {
    background: "rgba(255, 255, 255, 0.2)",
    padding: "10px 15px",
    borderRadius: "5px",
    fontSize: "14px",
  },
  rightSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  authCard: {
    padding: "30px",
    width: "80%",
    textAlign: "center",
    borderRadius: "10px",
    background: "white"
    , 
  },
  title: {
    marginBottom: "20px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  button: {
    marginTop: "15px",
  },
  toggleText: {
    marginTop: "10px",
    cursor: "pointer",
    color: "#007bff",
  },
  errorText: {
    marginTop: "10px",
    backgroundColor: "#f5f5f5",
    padding: "5px",
    borderRadius: "5px",
    color: "#d32f2f",
  },
};

export default UserAuthPage;
