const movieService = require('../services/movieService');

module.exports = {
    /**
     * * creates a new movie
     * @param {Request} req 
     * @returns {Promise<{status: number, message: string, data: any}>}
     */
    create: async (req) => {
        try {
            const {body} = req;
            // todo run some validations
            if(Object.values(body).includes(' ') || Object.values(body).includes('')) {
                return {
                    status: 400,
                    message: 'Please fill in all fields',
                }
            }

            if (body.rating > 5 || body.rating < 1) {
                return {
                    status: 400,
                    message: `Rating must be between 1 and 5, got ${body.rating}`,
                }
            }

            // create a new movie
            const newMovie = await movieService.create(req.body);
            return {
                status: newMovie ? 201 : 400,
                message: newMovie ? 'Successfully created Movie' : 'Unable to create Movie',
                data: newMovie
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500, 
                message: "🔥 Server Error 🔥 ",
                data: error.message
            }
        }
    },
    /**
     * * returns a list of movies
     * @returns {Promise<{status: number, message: string, data: any}>}
     */
    list: async () => {
        try {
            const allMovies = await movieService.getAll();
            const length = allMovies.length > 0;
            return {
                status: length ? 200 : 404,
                message: length ? 'Successfully retrieved all Movies' : "Unable to retrieve movies",
                data: allMovies
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500, 
                message: "🔥 Server Error 🔥 ",
                data: error.message
            }
        }
    },
    /**
     * * gets a movie by its slug
     * @param {Request} req
     */
    read: async (req) => {
        try {
            const movie = await movieService.getOne(req.params.slug)
            return {
                status: movie ? 200 : 404,
                message: movie ? "Successfully retrieved Movie" : "Unable to retrieve movie",
                data: movie
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500, 
                message: "🔥 Server Error 🔥 ",
                data: error.message
            }
        }
    },
}