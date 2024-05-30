const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");

const app = express();
const db = require("./config/mongoose");
//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const { default: mongoose } = require("mongoose");
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const { setFlash } = require("./config/middleware");

const port = 8000;

// should be done just before the server starts.. we want this precompiled
app.use(
  sassMiddleware({
    src: "./assets/scss", // where are the scss files
    dest: "./assets/css", // where it should be converted into css
    debug: true, // want to display if there is some error
    outputStyle: "extended", // extended.. it has a minification
    prefix: "/css", // prefix should it look for
  })
);
//for parsing content-type: application/x-www-form-urlencoded data
app.use(express.urlencoded());

// helps us to get cookie data from client to server, so as we can manipulate it if needed
app.use(cookieParser());

//accesing static files
app.use(express.static("./assets"));
//extract styles and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//let the machine know that we are using express layouts
app.use(expressLayouts);

// view engine config
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "socialMediaApp",
    //TODO change the secret before deployment
    secret: "aninsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost/social_media_development",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

// initialize passport
app.use(passport.initialize());
//will populate req.user with the current user.
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//for flash messages
app.use(flash());
app.use(setFlash);

//use express router
app.use("/", require("./routes"));

app.listen(port, () => {
  try {
    console.log(`server is up and running on port ${port}`);
  } catch (error) {
    console.log("error in connection: ", error);
  }
});
