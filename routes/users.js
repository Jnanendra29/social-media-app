const express = require("express");
const {
  profile,
  login,
  register,
  create,
  create_session,
  logout,
} = require("../controllers/usersController");

const router = express.Router();

router.get("/profile", profile);
router.get("/login", login);
router.get("/register", register);

router.post("/create", create);
router.post("/create-session", create_session);
router.get("/logout", logout)

module.exports = router;
