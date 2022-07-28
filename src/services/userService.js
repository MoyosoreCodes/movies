const {User} = require('../models/userModel');
const {Movie} = require('../models/movieModel');
const {Comment} = require('../models/commentModel');
const {generateToken} = require('../config/jwt');




module.exports = {
    /**
     * * create a new user
     * @param {object} body
     */
    create: async (body) => {
        const {username, email, password} = body;
        let query = {
            "$or": [
                {email}, 
                {username} 
            ]  
        }
        const existingUser = await User.findOne(query);
        if(existingUser) throw new Error("User already exists");

        const newUser = new User(body);
        await newUser.generatePassword(password);
        await newUser.save();
        return newUser;
    },
    /**
     * * authenticate user
     * @param {object} body
     * @returns {string}
     */
    authenticate: async (body) => {
        const {email, password} = body;
        let loginQuery = {email}

        const user = await User.findOne(loginQuery);
        if (!user) throw new Error(`${email} does not exist`);
        if(!await user.verifyPassword(password)) throw new Error("Invalid Credentials");

        const payload = {
            id: user._id,
            email: user.email
        }
        const {data} = generateToken(payload)

        return data;
    },
    /**
     * * gets all users
     * @return {User[]}
     */
    getAll: async () => {
        return await User.find().select('username password')
    },
    /**
     * * gets a  single user
     * @param {string} id 
     * @return {User}
     */
    getOne: async (id) => {
        return await User.findOne({_id: id})
    },
    /**
     * * updates a single user
     * @param {string} id 
     * @param {object} data
     * @return {User}
     */
    update: async (id, data) => {
        return await User.updateOne({_id: id}, {...data})
    },
    /**
     * * deletes a user
     * @param {string} id 
     */
    delete: async (id) => {
        return await User.deleteOne({_id: id})
    },
}