const postModel = require("../models/post");

const home = (req, res) => {
  // postModel
  //   .find({})
  //   .then((posts) => {
  //     return res.render("home", {
  //       title: "Home",
  //       posts: posts,
  //     });
  //   })
  //   .catch((error) => {
  //     console.log("error in fetching posts in home controller", error);
  //     return res.redirect("back");
  //   });

  // populate the user of each post
  postModel
    .find({})
    .populate("user")
    .then((posts) => {
      return res.render("home", {
        title: "Home",
        posts: posts,
      });
    })
    .catch((error) => {
      console.log("error in fetching post in home controller: ", error);
      return res.redirect("back");
    });
};

module.exports = {
  home,
};
