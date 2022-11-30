const { authenticate } = require('../auth/JWT');
const saleModel = require('../models/saleModel');
const CustomError = require('../utils/CustomError');

const getAllSales = async () => {
  const sales = await saleModel.getAllSales();
  if (!sales || sales.length === 0) {
    throw new CustomError('Sales not found', 404);
  }
  return { code: 200, data: sales };
};

const validateSaleRequest = (products, totalPrice, deliveryAddress, deliveryNumber) => {
  if (!products || !totalPrice || !deliveryAddress || !deliveryNumber) {
    return { message: 'Invalid fields', code: 400 };
  }
  return null;
};

const insertSale = async (token, { products, totalPrice, deliveryAddress, deliveryNumber }) => {
  const { role, id } = authenticate(token);
  if (role !== 'customer') {
    throw new CustomError('Invalid Role', 401);
  }

  const error = validateSaleRequest(products, totalPrice, deliveryAddress, deliveryNumber);
  if (error) throw new CustomError(error.message, error.code);

  const newSale = await saleModel.insertSale({
    id, products, totalPrice, deliveryAddress, deliveryNumber,
  });

  return { code: 200, data: newSale };
};

module.exports = { getAllSales, insertSale };
