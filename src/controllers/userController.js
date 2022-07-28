const userService = require('../services/userService');
const commentService = require('../services/commentService');

module.exports = {
    /**
     * @param {Request} req
     * @returns {Promise<{status: number, message: string, data: any}>}
     */
    register: async (req) => {
        try {
            const {body} = req;
            const {email, username, password} = body;
            console.log({email, username, password});
    
            //todo run some validations
            // 1. empty fields
            if(Object.values(body).includes(' ') || Object.values(body).includes('')) {
                return {
                    status: 400,
                    message: 'Please fill in all fields',
                }
            }
    
            // create a newUser
            const newUser = await userService.create(body)
            return {
                status: newUser ? 201 : 400,
                message: newUser ? 'Successfully created User' : 'Unable to create User',
                data: newUser
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
     * @param {Request} req
     * @returns {Promise<{status: number, message: string, data: any}>}
     */
    login: async (req) => {
        try {
            const {body} = req;
            const {username, password} = body;
            // todo validations
            // 1. empty fields
            if(Object.values(body).includes(' ') || Object.values(body).includes('')) {
                return {
                    status: 400,
                    message: 'Please fill in all fields',
                }
            }

            // authenticate users
            const authToken = await userService.authenticate(body);
            return {
                status: authToken ? 200 : 400,
                message: authToken ? 'Authentication successful' : 'Authentication failed',
                data: authToken
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
     * * add comment to a movie
     * @param {Request} req
     * @returns {Promise<{status: number, message: string, data: any}>}
     */
     comment: async (req) => {
        try {
            const {user, body} = req
            const {slug, comment} = body;
            const userEmail = user.email

            const newComment = await commentService.addComment(userEmail, slug, comment);

            return {
                status: newComment ? 201 : 400,
                message: newComment ? "Comment added successfully" : "Unable to add comment",
                data: newComment
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500, 
                message: "🔥 Server Error 🔥 ",
                data: error.message
            }
        }
    }
}