const { Schema, model } = require("mongoose");

function setMovieSlug() {
    this.slug = this.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-");
}

const movieObject = {
  name: { type: String, required: true },
  slug: { type: String},
  description: { type: String, required: true },
  releaseDate: { type: String, required: true },
  ticketPrice: { type: Number },
  rating: { type: Number, min: 1, max: 5 },
  country: { type: String },
  photo: { type: String },
  genre: [{ type: String, trim: true }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "comments"
  }]
};

const movieSchema = Schema(movieObject, { timestamps: true });

movieSchema.methods.setMovieSlug = setMovieSlug;

const Movie = model("Movie", movieSchema);

module.exports = {Movie};
