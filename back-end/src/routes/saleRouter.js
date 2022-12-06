const express = require('express');
const saleController = require('../controllers/saleController');

const router = express.Router();

router.get('/', saleController.getAllSales);
router.post('/', saleController.insertSale);
router.patch('/:id', saleController.updateSaleStatus);
router.get('/:id', saleController.getSaleById);

module.exports = router;