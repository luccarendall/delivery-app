const router = require('express').Router();
const registerController = require('../controllers/registerController');
const { registerMiddleware, adminRegisterMiddleware } = require('../middlewares/registerMiddleware');

router.post('/', registerMiddleware, registerController.register);
router.post('/admin', adminRegisterMiddleware, registerController.registerAdmin);

module.exports = router;
