const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/', authController.validateToken);

module.exports = router;