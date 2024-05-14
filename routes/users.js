const express = require("express");
const { profile } = require("../controllers/usersController");

const router = express.Router();

router.get("/profile", profile);

module.exports = router;
