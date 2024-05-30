const express = require("express");
const { createPost, destroy } = require("../controllers/postsController");
const passport = require("passport");

const router = express.Router();

router.post("/create", passport.checkAuthentication, createPost);
router.get("/destroy/:id", passport.checkAuthentication, destroy);

module.exports = router;
