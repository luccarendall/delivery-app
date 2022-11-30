const saleService = require('../services/saleService');

const getAllSales = async (req, res) => {
  const { data, error, code } = await saleService.getAllSales();

  if (error) return res.status(code).json(error);
  return res.status(code).json(data);
};

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

module.exports = { getAllSales, insertSale };
