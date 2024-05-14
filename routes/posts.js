const express = require("express");
const { posts } = require("../controllers/postsController");

const router = express.Router();

router.get("/allPosts", posts);

module.exports = router;
