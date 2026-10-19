import React from "react";
import {BrowserRouter as Router , Route , Routes} from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./Components/Home.js";
import Turf from "./Components/Turf.js";
import Cart from "./Components/Cart.js";
import Loginsig from "./Components/loginsig.js";
import AdminLogin from "./Components/Adminlogin.js";
import AdminDashboard from "./Components/AdminDashboard.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Booking from "./Components/viewbooking.js";
import Customer from "./Components/viewcustomers.js";
import Addturf from "./Components/addturf.js";
import About from "./Components/about.js";
import Contact from "./Components/contact.js";
import Manage from "./Components/manage.js";
import View from "./Components/viewallturf.js";
import PaymentSuccess from "./Components/sucess.js";
const theme=createTheme();
const isAdminAuthenticated = !!localStorage.getItem("adminToken");

function App () {
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <Router >
      <Routes >
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/admin/view-turfs" element={<View />} />
      <Route path="/admin/add-turf" element={<Addturf />} />
      <Route path="/about" element={<About/>} />
      <Route path="/contactus" element={<Contact/>} />
             <Route path="/admin/view-bookings" element={<Booking />} />
              <Route path="/admin/manage-turf" element={< Manage/>} />
        <Route path="admin/view-customers" element={<Customer />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/turf' element={<Turf />} />
        <Route path="/" element={<Loginsig/>}/>
        
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard/"
        element = {<AdminDashboard />} 
        />
      
      <Route
        path="/admin/bookings"
        element={isAdminAuthenticated ? <Booking /> : <Navigate to="/admin/login" />}
      />
      <Route
        path="/admin/customers"
        element={isAdminAuthenticated ? <Customer /> : <Navigate to="/admin/login" />}
      />
      </Routes >
    </Router>
    </ThemeProvider>
  );
}

export default App;
