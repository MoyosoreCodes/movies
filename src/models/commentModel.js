const { Schema, model } = require("mongoose");

const commentObject = {
  user: { type: Schema.Types.ObjectId, ref: "users" },
  comment: { type: String, required: true },
  movie: { type: Schema.Types.ObjectId, ref: "movies" },
};

const commentSchema = Schema(commentObject, { timestamps: true });

const Comment = model("Comment", commentSchema);

module.exports = {Comment};
