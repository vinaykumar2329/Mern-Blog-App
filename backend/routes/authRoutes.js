const express = require("express");
const { registerController, loginController, getAllUser } = require("../controllers/authController");
const router = express.Router();

router.get("/all-user",getAllUser)

router.post("/register",registerController)

router.post("/login",loginController)

module.exports = router;