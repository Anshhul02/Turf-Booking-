const{get}= require("../controllers/get");
const express = require("express");
const router = express.Router();

router.get("/admin/turfs/:adminId",get);
module.exports=router;