const { User } = require("../models/userModel");
const { Movie } = require("../models/movieModel");
const { Comment } = require("../models/commentModel");

module.exports = {
  /**
   * * create a new movie
   * @param {object} body
   */
  create: async (body) => {
    const {
        name, 
        description, 
        releaseDate, 
        rating,
        ticketPrice,
        genre, photo
    } = body;
    // upload the photo to cloudinary or something
    const newMovie = new Movie({
        name, description, 
        releaseDate, photo,
        rating, ticketPrice, genre
    });
    newMovie.setMovieSlug();
    Movie.updateOne({name: newMovie.name}, {rating}, {runValidators: true});
    await newMovie.save();
    return newMovie;
  },

  /**
   * * gets all movie
   * @returns {Movie[]}
   */
  getAll: async () => {
    return await Movie.find().populate({path:'comments', model: Comment});
  },
  /**
   * * gets a  single movie
   * @param {string} id
   */
  getOne: async (slug) => {
    return await Movie.findOne({slug}).populate({path:'comments', model: Comment});
  },
  /**
   * * updates a single movie
   * @param {string} id
   * @param {object} data
   * @return {Movie}
   */
  update: async (id, data) => {
    return await Movie.updateOne({ _id: id }, { ...data });
  },
  /**
   * * deletes a movie
   * @param {string} id
   */
  delete: async (id) => {
    return await Movie.deleteOne({ _id: id });
  },
  
};
