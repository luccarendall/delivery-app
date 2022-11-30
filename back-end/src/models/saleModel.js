const { Sale } = require('../database/models');

const getAllSales = async () => {
  const sales = await Sale.findAll();
  return sales; 
};

module.exports = { getAllSales };