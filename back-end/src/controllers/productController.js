const productService = require('../services/productService');
const CustomError = require('../utils/CustomError');

const getAllProducts = async (_req, res, next) => {
  const { data, error, code } = await productService.getAllProducts();

  if (error) {
    const customError = new CustomError(error.message, code);
    next(customError);
  } else {
    res.status(code).json(data);
  }
};

module.exports = { getAllProducts };
