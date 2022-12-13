const router = require('express').Router();
const imageController = require('../controllers/imageController');

router.get('/:name', imageController.getImages);

module.exports = router;