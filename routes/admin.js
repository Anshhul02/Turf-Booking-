const express = require("express");
const router = express.Router();
const Admin= require("../models/admin");
const{adminLogin,adminregi}=require("../controllers/admin")
const{viewbooking}=require("../controllers/viewbooking")
const Turf=require("../models/addturf");


router.get("/admin/booking", (req, res) => {
  res.json("login");
});
router.post("/admin/login", adminLogin);
router.post("/admin/register", adminregi);

router.get("/admin/register", (req, res) => {
    res.json("register");

});
router.get("/admin/login", (req, res) => {
    res.json("login");
});
router.get("/admin/myturfs/:adminId", async (req, res) => {
    try {
      const { adminId } = req.params;
      console.log("Admin ID received:", adminId); // Debugging log
  
      // Directly query using adminId as a string
      const turfs = await Turf.find({ adminId });
  
      res.status(200).json(turfs);
    } catch (error) {
      console.error("Error fetching turfs:", error);
      res.status(500).json({ message: "Server error fetching turfs" });
    }
  });
  
module.exports=router;