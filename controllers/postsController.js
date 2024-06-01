const commentModel = require("../models/comment");
const postModel = require("../models/post");

const createPost = (req, res) => {
  const new_post = new postModel({
    content: req.body.content,
    user: req.user._id,
  });
  new_post
    .save()
    .then((post) => {
      post
        .populate({
          path: "user",
          select: "-password",
        })
        .then((newpost) => {
          if (req.xhr) {
            return res.status(200).json({
              data: {
                post: newpost,
              },
              message: "Post created! ",
            });
          }
          req.flash("success", "Post published");
          return res.redirect("/");
        })
        .catch((error) => console.log("some error occured", error));
    })
    .catch((error) => {
      req.flash("error", error);
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

            if (req.xhr) {
              return res.status(200).json({
                data: {
                  post_id: req.params.id,
                },
                message: "Post deleted",
              });
            }

            req.flash("success", "Post and associated comments deleted");
            return res.redirect("/");
          })
          .catch((error) => {
            console.log("error inside post controller: ", error);
            return res.redirect("back");
          });
      } else {
        req.flash("error", "You cannot delete this post");
        return res.redirect("back");
      }
    })
    .catch((error) => {
      req.flash("error", error);
      return res.redirect("back");
    });
};

module.exports = { createPost, destroy };
