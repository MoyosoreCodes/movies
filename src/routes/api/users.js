const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const {extractFromAuthHeader} = require('../../config/jwt');


router.post('/', async (req, res) => {
    const {status, message, data} = await userController.register(req);
    return res.json({status, message, data});
})

router.post('/auth', async (req, res) => {
    const {status, message, data} = await userController.login(req);
    return res.json({status, message, data});
})

router.post('/comment', extractFromAuthHeader,  async (req, res) => {
    const {status, message, data} = await userController.comment(req);
    return res.json({status, message, data});
})

module.exports = router;