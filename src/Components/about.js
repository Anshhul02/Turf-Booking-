import React from "react";
import { Container, Typography, Paper, List, ListItem, Divider, Box, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundImage: `url(https://imgs.search.brave.com/euLi9wCuDRxeURuU1ARnUlZueWNRucutw8DWQ1k_AmA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90dXJm/bGFuZHMuY28ubnov/aW1hZ2VzL2xhd25f/dHlwZV9ib3hfaW1h/Z2VzL2xhd25fdHlw/ZV9ib3hfaW1hZ2Vf/ZmluZWxhd24uanBn)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
      }}
    >
      <Container maxWidth="lg">
        <Paper elevation={12} sx={{ p: 6, borderRadius: 4, backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 600, color: "#1b5e20" }}>
            About Us
          </Typography>

          <Divider sx={{ mb: 4 }} />

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
              Welcome to <span style={{ color: "#1b5e20" }}>TurfZone</span>!
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: "#333" }}>
              At TurfZone, we make booking sports turfs simple, fast, and hassle-free. Whether
              you’re a passionate footballer, a cricket enthusiast, or just looking for a place to enjoy a
              friendly game, we connect you with the best turfs near you.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: "#333" }}>
              Our goal is to revolutionize the way sports lovers book playing spaces. We strive to provide a
              seamless experience where users can check availability, book instantly, and enjoy their game
              without any scheduling conflicts.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
              Why Choose Us?
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <List>
                  <ListItem>
                    <Typography variant="body1" sx={{ color: "#333" }}>
                      ✅ <strong>Easy Booking:</strong> Book turfs in just a few clicks.
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body1" sx={{ color: "#333" }}>
                      ⚽ <strong>Wide Selection:</strong> Access top-rated turf facilities.
                    </Typography>
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={6}>
                <List>
                  <ListItem>
                    <Typography variant="body1" sx={{ color: "#333" }}>
                      ⏳ <strong>Real-Time Availability:</strong> Check available slots instantly.
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body1" sx={{ color: "#333" }}>
                      💳 <strong>Secure Payments:</strong> Multiple payment options for convenience.
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body1" sx={{ color: "#333" }}>
                      📍 <strong>Location-Based Search:</strong> Find the best turfs near you.
                    </Typography>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
              Join Our Community
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: "#333" }}>
              At TurfZone, we bring sports lovers together. Whether you're a casual player or a
              professional athlete, we are here to help you find the perfect place to play.
            </Typography>
            <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold", color: "#1b5e20" }}>
              Book your turf today and enjoy the game like never before!
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate("/turf")}>
              Explore Turfs
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AboutUs;
