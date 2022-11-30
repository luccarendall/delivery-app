const router = require('express').Router();
const registerController = require('../database/controllers/registerController');
const registerMiddleware = require('../middlewares/registerMiddleware');

router.post('/', registerMiddleware, registerController);

module.exports = router;
