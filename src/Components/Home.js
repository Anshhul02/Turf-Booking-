import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardMedia, CardContent, CardActions, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import bg3 from "D:/done/client/src/images/bg3.jpg";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [turfs, setTurfs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/turfs")
      .then((response) => {
        console.log("Fetched Turfs:", response.data);
        setTurfs(response.data.slice(0, 3)); // Show only 3 turfs
      })
      .catch((error) => {
        console.error("Error fetching turfs:", error);
      });

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  return (
    <div>
      <AppBar position="fixed" sx={{ backgroundColor: "white", boxShadow: 3, padding: "10px 0" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" fontWeight="bold" sx={{ color: "#2E7D32" }}>
            TurfZone
          </Typography>
          <div>
            <Button color="inherit" component={Link} to="/about" sx={{ margin: "0 10px", color: "#333" }}>About</Button>
            <Button color="inherit" component={Link} to="/turf" sx={{ margin: "0 10px", color: "#333" }}>Turfs</Button>
            <Button color="inherit" component={Link} to="/contactus" sx={{ margin: "0 10px", color: "#333" }}>Contact</Button>
            <Badge badgeContent={cart.length} color="error">
              <Button color="inherit" component={Link} to="/cart" sx={{ color: "#333" }}>
                <ShoppingCartIcon />
              </Button>
            </Badge>
          </div>
        </Toolbar>
      </AppBar>

      <div style={{
        backgroundImage: `url(${bg3})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        position: "relative"
      }}>
        <Container sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "40px", borderRadius: "10px" }}>
          <Typography variant="h3" fontWeight="bold">Premium Turf Booking</Typography>
          <Typography variant="h6" mt={2}>Book top-quality turfs with ease and convenience.</Typography>
          <Button variant="contained" color="success" size="large" sx={{ mt: 3 }} onClick={() => navigate("/turf")}>
            Get Started
          </Button>
        </Container>
      </div>

      <Container sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Explore Our Premium Turfs
        </Typography>
        <Grid container spacing={4}>
          {turfs.length === 0 ? (
            <Typography variant="h6" textAlign="center" sx={{ width: "100%" }}>Loading turfs...</Typography>
          ) : (
            turfs.map((turf, idx) => (
              <Grid item key={idx} xs={12} sm={6} md={4}>
                <Card sx={{ boxShadow: 5, borderRadius: "15px", transition: "0.3s", '&:hover': { transform: "scale(1.05)" } }}>
                  <CardMedia component="img" height="250" image={`http://localhost:5000${turf.imageUrl}`} alt={turf.name} />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">{turf.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{turf.location}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" color="success" fullWidth onClick={() => navigate("/turf")}>
                      Book Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>

      <footer style={{ backgroundColor: "#1b5e20", color: "white", textAlign: "center", padding: "30px 0", marginTop: "20px" }}>
        <Typography variant="body1">&copy; 2025 TurfZone. All rights reserved.</Typography>
      </footer>
    </div>
  );
}
