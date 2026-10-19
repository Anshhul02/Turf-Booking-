const express = require("express");
const router = express.Router();
const {send}=require("../controllers/send");
const Send=require("../models/sendturf");

router.get("/turfs",send);

module.exports=router;

