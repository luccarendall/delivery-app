const saleService = require('../services/saleService');

const insertSale = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { products, totalPrice, deliveryAddress, deliveryNumber } = req.body;
    const newSale = await saleService.insertSale(
      authorization, { products, totalPrice, deliveryAddress, deliveryNumber },
    );
    res.status(201).json(newSale);
  } catch (error) {
    next(error);
  }
};

module.exports = { insertSale };