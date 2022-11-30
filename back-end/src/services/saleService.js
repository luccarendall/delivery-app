const { authenticate } = require('../auth/JWT');
const saleModel = require('../models/saleModel');

const getAllSales = async () => {
  const sales = await saleModel.getAllSales();
  if (!sales || sales.length === 0) {
    return {
      error: { message: 'Sales not found' },
      code: 400,
    };
  }
  return { code: 200, data: sales };
}

const validateSaleRequest = (products, totalPrice, deliveryAddress, deliveryNumber) => {
  if (!products || !totalPrice || !deliveryAddress || !deliveryNumber) {
    return {
      error: { message: 'Invalid fields' },
      code: 400,
    };
  }
  return null;
};

const insertSale = async (token, { products, totalPrice, deliveryAddress, deliveryNumber }) => {
  const { role, id } = authenticate(token);
  if (role !== 'customer') {
    return {
      error: { message: 'Invalid role' },
      code: 400,
    };
  };

  const error = validateSaleRequest(products, totalPrice, deliveryAddress, deliveryNumber);
  if (error) return error;

  const newSale = await saleModel.insertSale({
    id, products, totalPrice, deliveryAddress, deliveryNumber,
  });

  return { code: 200, data: newSale };
};

module.exports = { getAllSales, insertSale };
