const commentModel = require("../models/comment");
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

// deleting a post
const destroy = (req, res) => {
  const post = postModel.findById(req.params.id);
  post
    .then((post) => {
      // .id provided by mongoose converts the object id to string
      if (post.user == req.user.id) {
        const deletedPost = postModel.findByIdAndDelete(post._id);
        deletedPost
          .then((result) => console.log("successfull: ", result))
          .catch((error) => console.log("error in deleting post: ", error));

        const deletedComments = commentModel.deleteMany({
          post: req.params.id,
        });
        deletedComments
          .then((result) => {
            console.log("comments deleted successfully: ", result);
            return res.redirect("/");
          })
          .catch((error) => {
            console.log("error inside post controller: ", error);
            return res.redirect("back");
          });
      } else {
        return res.redirect("back");
      }
    })
    .catch((error) => {
      console.log("error inside post controller: ", error);
      return res.redirect("back");
    });
};

module.exports = { createPost, destroy };
