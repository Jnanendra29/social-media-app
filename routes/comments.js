const express = require("express");
const { create, destroy } = require("../controllers/commentController");
const passport = require("passport");

const router = express.Router();

router.post("/create", passport.checkAuthentication, create);
router.get("/destroy/:id", passport.checkAuthentication , destroy)

module.exports = router;
