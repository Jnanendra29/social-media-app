const passport = require("passport");
const userModel = require("../models/user");

const LocalStrategy = require("passport-local").Strategy;

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      // find a user and establish the identity
      userModel
        .findOne({ email: email })
        .then((user) => {
          if (!user || user.password !== password) {
            console.log("Invalid Username/Password");
            return done(null, false);
          }

          return done(null, user);
        })
        .catch((error) => {
          console.log("error occured in passport-local: ", error);
          return done(error);
        });
    }
  )
);

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  userModel
    .findById(id)
    .then((user) => {
      return done(null, user);
    })
    .catch((error) => {
      console.log("error occured in passport-local: ", error);
      return done(error);
    });
});

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // if the user is loggedin, the pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }

  // if the user is not logged in
  return res.redirect("/users/login");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
