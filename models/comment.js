const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    // comment belongs to a user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
  },
  {
    timestamps: true,
  }
);

const commentModel = mongoose.model("comments", commentSchema);
module.exports = commentModel;
