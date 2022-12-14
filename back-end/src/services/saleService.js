const { authenticate } = require('../auth/JWT');
const saleModel = require('../models/saleModel');
const CustomError = require('../utils/CustomError');

const getAllSales = async (token) => {
  const user = await authenticate(token);
  const sales = await saleModel.getAllSales(user.role, user.id);
  // if (!sales) {
  //   throw new CustomError('Sales not found', 404);
  // }
  return { code: 200, data: sales };
};

const validateSaleRequest = (products, totalPrice, deliveryAddress, deliveryNumber) => {
  if (!products || !totalPrice || !deliveryAddress || !deliveryNumber) {
    return { message: 'Invalid fields', code: 400 };
  }
  return null;
};

const insertSale = async (token, { products, totalPrice, deliveryAddress, deliveryNumber }) => {
  const { role, id } = await authenticate(token);
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

const updateSaleStatus = async (status, id) => {
  if (status === 'Preparando' || status === 'Em Trânsito' || status === 'Entregue') {
    const sale = await saleModel.updateSaleStatus(status, id);
    return { code: 200, data: sale };
  }
  throw new CustomError('Invalid request', 400); 
};

// const getSalesById = async (userId) => {
//   const sales = await Sale.findAll(
//     { 
//     where: { userId }, 
//     raw: true,
//     },
//     );

//   const saleData = sales.map(({ id, saleDate, totalPrice, status }) => (
//   {
//     id,
//     saleDate: saleDate.toLocaleDateString('pt-BR'), // https://stackoverflow.com/questions/27939773/tolocaledatestr
//     totalPrice,
//     status,
//   }));

//   if (!saleData || saleData.length === 0) throw new Error('Orders not found');
//   return saleData;
// };

const getSaleById = async (token, id) => {
  const user = await authenticate(token);
  const saleByid = await saleModel.getSaleById(user.role, user.id, id);
  if (!saleByid) {
    throw new CustomError('Sale id not found', 404);
  }
  return { code: 200, data: saleByid };
};

module.exports = { getAllSales, insertSale, updateSaleStatus, getSaleById };
