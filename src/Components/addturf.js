import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Chip,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const AddTurf = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    pricePerHour: "",
    availableSlots: [],
    availableDates: [],
    image: null,
    date: "",
    imageUrl: "",
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imageUrl: URL.createObjectURL(file),
      });
    }
  };

  const handleAddDate = () => {
    if (selectedDate) {
      const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
      if (!formData.availableDates.includes(formattedDate)) {
        setFormData({
          ...formData,
          availableDates: [...formData.availableDates, formattedDate],
        });
      }
    }
  };

  const handleRemoveDate = (date) => {
    setFormData({
      ...formData,
      availableDates: formData.availableDates.filter((d) => d !== date),
    });
  };

  const handleSlotChange = (event) => {
    const selectedValues = event.target.value;
    setAvailableSlots(selectedValues);
    setFormData({ ...formData, availableSlots: selectedValues });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adminId = localStorage.getItem("adminId");
    if (!adminId) {
      setResponseMessage("Admin not logged in. Please log in again.");
      return;
    }

    if (
      !formData.name ||
      !formData.location ||
      !formData.pricePerHour ||
      !formData.image ||
      !formData.availableDates.length ||
      !formData.availableSlots.length
    ) {
      setResponseMessage("Please fill in all the fields.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("location", formData.location);
    data.append("pricePerHour", formData.pricePerHour);
    data.append("availableSlots", JSON.stringify(formData.availableSlots));
    data.append("availableDates", JSON.stringify(formData.availableDates));
    data.append("image", formData.image);
    data.append("adminId", adminId);

    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:5000/admin/addturf", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResponseMessage(response.data.message);

      setFormData({
        name: "",
        location: "",
        pricePerHour: "",
        availableSlots: [],
        availableDates: [],
        image: null,
        imageUrl: "",
      });
      setAvailableSlots([]);
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        <Container component="main" maxWidth="sm">
          <Paper
            elevation={10}
            sx={{
              p: 4,
              mt: 4,
              borderRadius: 3,
              backgroundColor: "white",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
              Add Turf
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField label="Turf Name" name="name" value={formData.name} onChange={handleChange} required fullWidth />
              <TextField label="Location" name="location" value={formData.location} onChange={handleChange} required fullWidth />
              <TextField label="Price Per Hour" name="pricePerHour" type="number" value={formData.pricePerHour} onChange={handleChange} required fullWidth />

              <Typography variant="body1" fontWeight="bold">Select Available Dates:</Typography>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newDate) => setSelectedDate(newDate)}
                slotProps={{ textField: { fullWidth: true } }}
              />
              <Button variant="outlined" onClick={handleAddDate} fullWidth>
                Add Date
              </Button>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {formData.availableDates.map((date, index) => (
                  <Chip key={index} label={date} onDelete={() => handleRemoveDate(date)} />
                ))}
              </Box>

              <Typography variant="body1" fontWeight="bold">Select Available Time Slots:</Typography>
              <Select multiple value={availableSlots} onChange={handleSlotChange} fullWidth>
                {["10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "12:00 PM - 1:00 PM","1:00 PM - 2:00 PM","2:00 PM - 3:00 PM"
                  ,"3:00 PM - 4:00 PM","4:00 PM - 5:00 PM","5:00 PM - 6:00 PM","6:00 PM - 7:00 PM","7.00 PM - 8:00 PM"
                ].map((slot) => (
                  <MenuItem key={slot} value={slot}>
                    <Checkbox checked={availableSlots.includes(slot)} />
                    <ListItemText primary={slot} />
                  </MenuItem>
                ))}
              </Select>

              <input type="file" accept="image/*" onChange={handleFileChange} required />

              <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                {isSubmitting ? "Adding Turf..." : "Add Turf"}
              </Button>
            </Box>

            {responseMessage && <Typography color="error" align="center" mt={2}>{responseMessage}</Typography>}
          </Paper>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

export default AddTurf;
