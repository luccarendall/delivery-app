const saleService = require('../services/saleService');

const getAllSales = async (req, res) => {
  const { data, error, code } = await saleService.getAllSales();

  if (error) return res.status(code).json(error);
  return res.status(code).json(data);
};

module.exports = { getAllSales };