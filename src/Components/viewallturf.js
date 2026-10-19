import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Container, Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Box 
} from "@mui/material";

const ViewAllTurf = () => {
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTurfs = async () => {
      setLoading(true);
      setError(null);

      const adminId = localStorage.getItem("adminId");
      console.log("Admin ID:", adminId);

      if (!adminId) {
        console.error("Admin ID not found in localStorage.");
        setError("Admin ID not found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/admin/myturfs/${adminId}`);
        console.log("Fetched turfs:", response.data);
        setTurfs(response.data);
      } catch (error) {
        console.error("Error fetching turfs:", error);
        setError("Failed to load turfs. Please try again.");
      }

      setLoading(false);
    };

    fetchTurfs();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url(https://imgs.search.brave.com/9VU3-MgA36OzWvo1PSvblhrHOQ5y_eS7B3q4gK5vC3c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzEzLzg4LzM4/LzM2MF9GXzkxMzg4/Mzg2MF9iNHFkbjlC/ZWVjeXpiZzlkZ2ZI/UEFrSkZiaFpvQjFp/Zi5qcGc)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        padding: "20px",
      }}
    >
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          Your Added Turfs
        </Typography>

        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto", mt: 3 }} />
        ) : error ? (
          <Typography align="center" sx={{ mt: 2, color: "red" }}>{error}</Typography>
        ) : turfs.length === 0 ? (
          <Typography align="center" sx={{ mt: 2 }}>You have not added any turfs.</Typography>
        ) : (
          <Grid container spacing={3}>
            {turfs.map((turf) => (
              <Grid item xs={12} sm={6} md={4} key={turf._id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`http://localhost:5000${turf.imageUrl}`}
                    alt={turf.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{turf.name}</Typography>
                    <Typography variant="body2"><strong>Location:</strong> {turf.location}</Typography>
                    <Typography variant="body2"><strong>Price Per Hour:</strong> ₹{turf.pricePerHour}</Typography>
                    <Typography variant="body2">
                      <strong>Available Slots:</strong>{" "}
                      {Array.isArray(turf.availableSlots) && turf.availableSlots.length > 0 
                        ? turf.availableSlots.join(", ") 
                        : "No slots available"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ViewAllTurf;
