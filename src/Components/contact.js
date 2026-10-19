import React from 'react';
import { Container, Typography, Paper, TextField, Button, Grid, Box, IconButton } from '@mui/material';
import { useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ContactUs = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted", formData);
    };

    return (
        <Box sx={{
            backgroundImage: 'url(https://imgs.search.brave.com/1cKjjiCaWN_Kp87jEzmbM9CySJBwwAjep6YfRdonNus/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEwLzk3Lzk0Lzkz/LzM2MF9GXzEwOTc5/NDkzMzhfbmlscW1y/S3dZOW5pN0lxTnJN/U3pNbTZiTWtJUkhJ/Z1AuanBn)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
        }}>
            <Container maxWidth="lg">
                <Paper elevation={10} sx={{ p: 6, borderRadius: 3, textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                    <Typography variant="h3" fontWeight="bold" color="#1b5e20" gutterBottom>
                        Get in Touch
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        We’d love to hear from you! Whether you have questions or feedback, feel free to reach out.
                    </Typography>

                    <Grid container spacing={4} sx={{ mt: 2 }}>
                        {/* Contact Details */}
                        <Grid item xs={12} md={6} textAlign="left">
                            <Typography variant="h5" fontWeight="bold" color="#1b5e20" gutterBottom>
                                Contact Information
                            </Typography>
                            <Box display="flex" alignItems="center" mb={2}>
                                <IconButton color="success">
                                    <EmailIcon />
                                </IconButton>
                                <Typography variant="body1" color="text.secondary" ml={1}><strong>Email:</strong> support@turfzone.com</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={2}>
                                <IconButton color="success">
                                    <PhoneIcon />
                                </IconButton>
                                <Typography variant="body1" color="text.secondary" ml={1}><strong>Phone:</strong>+91 9892698196</Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <IconButton color="success">
                                    <LocationOnIcon />
                                </IconButton>
                                <Typography variant="body1" color="text.secondary" ml={1}><strong>Address:</strong> 123 Turf Street, Sports City, Country</Typography>
                            </Box>
                        </Grid>

                        {/* Contact Form */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" fontWeight="bold" color="#1b5e20" gutterBottom>
                                Send Us a Message
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Message"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                    size="large"
                                    fullWidth
                                    sx={{ borderRadius: 2, textTransform: 'none', fontSize: '16px' }}
                                >
                                    Send Message
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

export default ContactUs;
