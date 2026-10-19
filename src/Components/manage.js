import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Typography, Box, Paper } from "@mui/material";

const ManageTurf = () => {
  const navigate = useNavigate();

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
      }}
    >
      <Container>
        <Paper
          elevation={10}
          sx={{
            p: 3,
            width: { xs: "90%", sm: "60%", md: "100%" },
            textAlign: "center",
            borderRadius: 2,
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark semi-transparent background for contrast
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.4)", // Light border for contrast
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="#ffffff" gutterBottom>
            Manage Turf
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#4CAF50", // Green for good visibility
                "&:hover": { backgroundColor: "#388E3C" }, // Darker on hover
              }}
              onClick={() => navigate("/admin/add-turf")}
            >
               Add Turf
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FF9800", // Orange for contrast
                "&:hover": { backgroundColor: "#F57C00" }, // Darker on hover
              }}
              onClick={() => navigate("/admin/view-turfs")}
            >
               View Turfs
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ManageTurf;
