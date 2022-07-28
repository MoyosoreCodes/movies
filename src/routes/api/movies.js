const express = require('express');
const router = express.Router();
const movieController = require('../../controllers/movieController');
const {extractFromAuthHeader} = require('../../config/jwt');

router.get('/', async (req, res) => {
    const {status, message, data} = await movieController.list(req);
    return res.json({status, message, data});
})

router.get('/:slug', async (req, res) => {
    console.log(req.params.slug);
    const {status, message, data} = await movieController.read(req);
    return res.json({status, message, data});
})

router.post('/', extractFromAuthHeader, async (req, res) => {
    const {status, message, data} = await movieController.create(req);
    return res.json({status, message, data});
})

module.exports = router;