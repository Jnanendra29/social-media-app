const userModel = require("../models/user");

//profile
const profile = (req, res) => {
  userModel
    .findById(req.params.id)
    .exec()
    .then((user) => {
      return res.render("user_profile", {
        title: "userProfile",
        profile_user: user,
      });
    })
    .catch((error) =>
      console.log("error in fetching user in profile controller: ", error)
    );
};

//update
const update = (req, res) => {
  if (req.user.id == req.params.id) {
    userModel
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .exec()
      .then((user) => {
        console.log("succesfully updated the user: ", user);
        return res.redirect("back");
      })
      .catch((error) =>
        console.log("error while updating the profile info: ", error)
      );
  } else {
    return res.status(401).send("Unauthorized");
  }
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
  req.flash("success", "Logged in successfully");
  return res.redirect("/");
};

const destroySession = (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    req.flash("success", "You have logged out");
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
  update,
};
