import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Paper, TextField, Button, Typography, Box, CircularProgress } from "@mui/material";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");
  
    const endpoint = isLogin
      ? "http://localhost:5000/admin/login"
      : "http://localhost:5000/admin/register";
  
    try {
      const response = await axios.post(endpoint, formData);
      console.log("Login Response Data:", response.data); // Debugging
  
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("adminId", response.data.adminId || "");
        localStorage.setItem("token", response.data.token || "");
  
        console.log("Stored Admin ID:", localStorage.getItem("adminId"));
        console.log("Stored Token:", localStorage.getItem("token"));
  
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 500); // Ensures localStorage updates before navigating
      }
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={10}
        sx={{ p: 4, mt: 8, textAlign: "center", borderRadius: 2, backgroundColor: "white", color: "black" }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {isLogin ? "Admin Login" : "Admin Sign Up"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {!isLogin && (
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              variant="filled"
              sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}
            />
          )}
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            variant="filled"
            sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            variant="filled"
            sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ fontWeight: "bold" }} disabled={loading}>
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : isLogin ? "Login" : "Sign Up"}
          </Button>
        </Box>
        {responseMessage && (
          <Typography
            color={responseMessage.includes("successful") ? "success.main" : "error"}
            variant="body2"
            mt={2}
            sx={{ backgroundColor: "#f5f5f5", p: 1, borderRadius: 1, textAlign: "center" }}
          >
            {responseMessage}
          </Typography>
        )}
        <Typography variant="body2" mt={2}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Button variant="text" color="primary" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign up" : "Login"}
          </Button>
        </Typography>
      </Paper>
    </Container>
  );
};

export default AuthPage; 