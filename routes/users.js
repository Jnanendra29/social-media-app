const express = require("express");
const { profile, login, register, create } = require("../controllers/usersController");

const router = express.Router();

router.get("/profile", profile);
router.get("/login", login)
router.get("/register", register)

router.post("/create", create)

module.exports = router;
