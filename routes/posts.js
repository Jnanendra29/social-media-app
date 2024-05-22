const express = require("express");
const { posts } = require("../controllers/postsController");
const createPost = require("../controllers/postsController");

const router = express.Router();

router.post("/create", createPost);

module.exports = router;
