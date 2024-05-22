const userModel = require("../models/user");

const profile = (req, res) => {
  return res.render("user_profile", {
    title: "userProfile",
  });
};

//render the login page
const login = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("login", {
    title: "login",
  });
};

//render the register page
const register = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("register", {
    title: "register",
  });
};

//get the register data
const create = (req, res) => {
  if (req.body.password !== req.body.confirm_password) {
    return res.redirect("back");
  }

  //check if user exists or not
  userModel
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        console.log("user already exists enter a unique email Id");
        return res.redirect("back");
      } else {
        const newUser = new userModel(req.body);
        newUser
          .save()
          .then((user) => {
            console.log("new user created", user);
            return res.redirect("/users/login");
          })
          .catch((error) => {
            console.log("error in registering user: ", error);
            return;
          });
      }
    })
    .catch((error) => {
      console.log("error in finding user in registering user: ", error);
      return;
    });
};

//login and create the session data
const create_session = (req, res) => {
  return res.redirect("/");
};

const destroySession = (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    return res.redirect("/users/login");
  });
};

module.exports = {
  profile,
  login,
  register,
  create,
  create_session,
  destroySession,
};
