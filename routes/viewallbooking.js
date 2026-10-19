const express = require("express");
const router = express.Router();
const {viewbooking}=require("../controllers/viewbooking");



router.get("/admin/booking",viewbooking);
module.exports=router;