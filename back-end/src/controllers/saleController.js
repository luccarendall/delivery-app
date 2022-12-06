const saleService = require('../services/saleService');

const getAllSales = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { data, code } = await saleService.getAllSales(authorization);
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

const updateSaleStatus = async (req, res, next) => {
  try {
    const { query: { status }, params: { id } } = req;
    const { data, code } = await saleService.updateSaleStatus(status, id);
    return res.status(code).json(data);
  } catch (error) {
    next(error);
  }
};

// const getSalesById = async (req, res, next) => {
//   try {
//     const saleData = await getSalesById(req.params.id);
//     return res.status(200).json(saleData);
//   } catch (error) {
//     next(error);
//   }
// };

const getSaleById = async ({ req, res, next }) => {
  try {
    const { authorization } = req.headers;
    const { data, code } = await saleService.getSaleById(authorization, req.body);
  return res.status(code).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllSales, insertSale, updateSaleStatus, getSaleById };
