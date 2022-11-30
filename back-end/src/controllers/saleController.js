const saleService = require('../services/saleService');

const getAllSales = async (_req, res, next) => {
  try {
    const { data, code } = await saleService.getAllSales();
    return res.status(code).json(data);
  } catch (error) {
    next(error);
  }
};

const insertSale = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { data, code } = await saleService.insertSale(
    authorization, req.body,
  );
  return res.status(code).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllSales, insertSale };
