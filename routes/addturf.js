const express = require("express");
const router = express.Router();
const { addturf } = require("../controllers/add");
const upload = require("../middleware/upload"); 
const Turf=require("../models/addturf");
// Admin adds a new turf
router.post("/admin/addturf", upload.single("image"), addturf);


router.get("/admin/addturf" ,(req,res)=>{
    res.json("ok");
});


module.exports = router;
