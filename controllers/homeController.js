const postModel = require("../models/post");
const userModel = require("../models/user");

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
    .sort({createdAt: -1})
    .populate("user")
    .populate({ path: "comments", populate: { path: "user" } })
    .then((posts) => {
      userModel
        .find()
        .exec()
        .then((users) => {
          // console.log("inside home controller", users)
          return res.render("home", {
            title: "Home",
            posts: posts,
            all_users: users,
          });
        })
        .catch((error) => console.log("error in fetching users: ", error));
    })
    .catch((error) => {
      console.log("error in fetching post in home controller: ", error);
      return res.redirect("back");
    });
};

module.exports = {
  home,
};
