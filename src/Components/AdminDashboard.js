import React from "react";
import { Link } from "react-router-dom";
import { Container, Paper, Typography, List, ListItem, ListItemButton, ListItemText, Box } from "@mui/material";

export default function AdminDashboard() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('https://imgs.search.brave.com/9VU3-MgA36OzWvo1PSvblhrHOQ5y_eS7B3q4gK5vC3c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzEzLzg4LzM4/LzM2MF9GXzkxMzg4/Mzg2MF9iNHFkbjlC/ZWVjeXpiZzlkZ2ZI/UEFrSkZiaFpvQjFp/Zi5qcGc')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Container component="main" maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 2,
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.85)", // Glassmorphism effect
            backdropFilter: "blur(8px)", // Smooth blur effect
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Admin Dashboard
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin/manage-turf">
                <ListItemText primary="Manage Turfs" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin/view-bookings">
                <ListItemText primary="View Bookings" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin/view-customers">
                <ListItemText primary="View Customers" />
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>
      </Container>
    </Box>
  );
}
