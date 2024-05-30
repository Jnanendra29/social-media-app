const express = require("express");
const { home } = require("../controllers/homeController");

const router = express.Router();

router.get("/", home);
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/comment", require("./comments"));

//for any further routes, access from here
// router.use("/routerName, require("/routerfile"));

module.exports = router;
