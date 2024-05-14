const express = require("express");
const { home } = require("../controllers/homeController");

const router = express.Router();

router.get("/", home);
router.use("/users", require("./users"));
router.use("/posts", require("./posts"))

module.exports = router;
