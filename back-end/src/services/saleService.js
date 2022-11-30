const { authenticate } = require('../auth/JWT');
const saleModel = require('../models/saleModel');

const validateSaleRequest = (products, totalPrice, deliveryAddress, deliveryNumber) => {
  if (!products || !totalPrice || !deliveryAddress || !deliveryNumber) {
    return 'invalid Request';
  }
  return null;
};

const insertSale = async (token, { products, totalPrice, deliveryAddress, deliveryNumber }) => {
  const { role, id } = authenticate(token);
  if (role !== 'customer') throw new Error('invalid role');

  const error = validateSaleRequest(products, totalPrice, deliveryAddress, deliveryNumber);
  if (error) throw new Error(error);

  const newSale = await saleModel.insertSale({
    id, products, totalPrice, deliveryAddress, deliveryNumber,
  });

  return newSale;
};

module.exports = { insertSale };