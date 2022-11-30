const express = require('express');
const saleController = require('../controllers/saleController');

const router = express.Router();

router.post('/', saleController.insertSale);

module.exports = router;