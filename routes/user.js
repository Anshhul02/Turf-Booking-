const express = require("express");
const router = express.Router();
const { handleUsersSignup, handleUsersLogin,
  } = require('../controllers/user');
const User = require("../models/user");




//restApi
router.post("/register", handleUsersSignup,);
router.post("/login", handleUsersLogin);





//static routes
router.get("/register", (req, res) => {
    res.json("register");

});
router.get("/login", (req, res) => {
    res.json("login");
});



module.exports = router;
