const { authenticate } = require('../auth/JWT');
const saleModel = require('../models/saleModel');

const getAllSales = async (token) => {
  const { role } = authenticate(token);
  if (role !== 'customer') throw new Error('invalid role');

  const sales = await saleModel.getAllSales();
  if (!sales || sales.length === 0) {
    return {
      error: { message: 'Sales not found' },
      code: 400,
    };
  }
  return { code: 200, data: sales };
}

module.exports = { getAllSales };
