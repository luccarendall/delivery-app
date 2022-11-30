const saleService = require('../services/saleService');
const CustomError = require('../utils/CustomError');

const getAllSales = async (_req, res) => {
  const { data, error, code } = await saleService.getAllSales();

  if (error) {
    const customError = new CustomError(error.message, code);
    next(customError);
  } else {
    res.status(code).json(data);
  }
};

const insertSale = async (req, res, next) => {
  const { authorization } = req.headers;
  // const { products, totalPrice, deliveryAddress, deliveryNumber } = req.body;
  const { data, error, code } = await saleService.insertSale(
    authorization, req.body,
  );
  if (error) {
    const customError = new CustomError(error.message, code);
    next(customError);
  } else {
    res.status(code).json(data);
  };

};

module.exports = { getAllSales, insertSale };
