const router = require('express').Router();
const registerController = require('../controllers/registerController');
const registerMiddleware = require('../middlewares/registerMiddleware');

router.post('/', registerMiddleware, registerController.register);

module.exports = router;
