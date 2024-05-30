const commentModel = require("../models/comment");
const postModel = require("../models/post");

const create = (req, res) => {
  //   console.log(req.body);
  const post = postModel.findById(req.body.post);
  post
    .then((post) => {
      const new_comment = new commentModel({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      new_comment
        .save()
        .then((comment) => {
          post.comments.push(comment);
          post.save(); // lock data
          return res.redirect("/");
        })
        .catch((error) => {
          console.log("error occured while creating comment: ", error);
          return res.redirect("back");
        });
    })
    .catch((error) => {
      console.log("error inside comment controller: ", error);
    });
};

const destroy = (req, res) => {
  const comment = commentModel.findById(req.params.id);
  comment
    .then((comment) => {
      if (comment.user == req.user.id) {
        let postId = comment.post;
        const deletedComment = commentModel.findByIdAndDelete(comment._id);
        deletedComment
          .then((result) =>
            console.log("comment deleted successfully: ", result)
          )
          .catch((error) =>
            console.log("error while deleting comment: ", error)
          );
        const updatedPost = postModel.findByIdAndUpdate(postId, {
          $pull: { comments: req.params.id },
        });
        updatedPost
          .then((result) => {
            console.log("updated successfully");
            return res.redirect("/");
          })
          .catch((error) => {
            console.log("error in deleting comment: ", error);
            return res.redirect("back");
          });
      } else {
        return res.redirect("back");
      }
    })
    .catch((error) => {
      console.log("error in fetching comment: ", error);
    });
};

module.exports = { create, destroy };
