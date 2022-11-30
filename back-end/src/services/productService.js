const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  if (!products || products.length === 0) {
    return {
      error: { message: 'Products not found' },
      code: 400,
    };
  }
  return { code: 200, data: products };
};

module.exports = { getAllProducts };
