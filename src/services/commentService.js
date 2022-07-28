const { User } = require("../models/userModel");
const { Movie } = require("../models/movieModel");
const { Comment } = require("../models/commentModel");

module.exports = {
  /**
   * * add comment to a movie
   * @param {string} userEmail
   * @param {string} slug
   * @param {string} comment
   */
  addComment: async (userEmail, slug, comment) => {
    const user = await User.findOne({ email: userEmail });
    const movie = await Movie.findOne({ slug });
    if (!movie || !user) throw new Error('Cannot find movie or user');

    const newComment = new Comment({
      user: user._id,
      comment,
      movie: movie._id,
    });
    movie.comments.push(newComment._id);
    await movie.save();
    await newComment.save();
    return newComment;
  },

  /**
   * * updates a comment
   * @param {string} commentId
   * @param {string} userId
   * @param {string} newComment
   */
  updateComment: async (commentId, userId, newComment) => {
    return await Comment.updateOne(
      { _id: commentId, userId },
      { comment: newComment }
    );
  },
};
