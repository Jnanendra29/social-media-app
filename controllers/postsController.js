const postModel = require("../models/post");

const createPost = (req, res) => {
  const new_post = new postModel({
    content: req.body.content,
    user: req.user._id,
  });
  new_post
    .save()
    .then(() => {
      console.log("post created", new_post);
      return res.redirect("/");
    })
    .catch((error) => {
      console.log("error in creating post", error);
      return res.redirect("back");
    });
};

module.exports = {createPost}