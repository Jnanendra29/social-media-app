const express = require("express");
const {
  profile,
  login,
  register,
  create,
  create_session,
  destroySession,
  update,
} = require("../controllers/usersController");
const passport = require("passport");

const router = express.Router();

router.get("/profile/:id", passport.checkAuthentication, profile);
router.post("/update/:id", passport.checkAuthentication, update);

router.get("/login", login);
router.get("/register", register);

router.post("/create", create);
//use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/login" }),
  create_session
);

router.get("/logout", destroySession)

module.exports = router;
