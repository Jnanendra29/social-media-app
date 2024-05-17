const userModel = require("../models/user");

const profile = (req, res) => {
  // console.log(req.cookies);
  if (req.cookies.user_id) {
    userModel
      .findById(req.cookies.user_id)
      .then((user) => {
        if (user) {
          return res.render("user_profile", {
            title: "User Profile",
            user: user,
          });
        } else {
          return res.redirect("/users/login");
        }
      })
      .catch((error) => {
        console.log("error in finding user: ", error);
      });
  } else {
    return res.redirect("/users/login");
  }
};

//render the login page
const login = (req, res) => {
  return res.render("login", {
    title: "login",
  });
};

//render the register page
const register = (req, res) => {
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
  //find the user
  userModel
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        console.log("user exists", user);
        //password mismatch
        if (req.body.password !== user.password) {
          return res.redirect("back");
        } else {
          //session creation
          res.cookie("user_id", user._id);
          return res.redirect("/users/profile");
        }
      } else {
        //user does not exists
        console.log("user does not exists, register first");
        return res.redirect("/users/register");
      }
    })
    .catch((error) => {
      console.log("error in finding user in login user: ", error);
    });
};

// logOut function end the session
const logout = (req, res) => {
  console.log("logout: ", req.cookies.user_id);
  if (req.cookies.user_id) {
    delete req.cookies['user_id'];
    return res.redirect("/users/login");
  } else {
    return res.redirect("/users/login");
  }
};

module.exports = {
  profile,
  login,
  register,
  create,
  create_session,
  logout,
};
