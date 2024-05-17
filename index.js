const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const db = require("./config/mongoose")

const port = 8000;

//accesing static files
app.use(express.static("./assets"));
//extract styles and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//let the machine know that we are using express layouts
app.use(expressLayouts);

//use express router
app.use("/", require("./routes"));

// view engine config
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, () => {
  try {
    console.log(`server is up and running on port ${port}`);
  } catch (error) {
    console.log("error in connection: ", error);
  }
});
