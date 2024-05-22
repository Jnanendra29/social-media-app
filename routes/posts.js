const express = require("express");
const { createPost } = require("../controllers/postsController");
const passport = require("passport");

const router = express.Router();

router.post("/create", passport.checkAuthentication, createPost);

module.exports = router;
