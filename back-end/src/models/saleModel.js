const { SaleProduct, Sale, Product, sequelize } = require('../database/models');

const getAllSales = async () => {
  const sales = await Sale.findAll({
    include: [{
      model: Product,
      as: 'products',
      through: { attributes: [] },
    }],
  });
  return sales; 
};

const insertSale = async ({ id, products, totalPrice, deliveryAddress, deliveryNumber }) => {
  const result = await sequelize.transaction(async (t) => {
    const newSale = await Sale.create(
      { 
        userId: id, sellerId: 1, totalPrice, deliveryAddress, deliveryNumber, saleDate: new Date(),
      },
      { transaction: t },
    );
    await Promise.all(products.map(async (product) => {
      await SaleProduct.create(
        { saleId: newSale.id, productId: product.id, quantity: product.quantity },
        { transaction: t },
      );
    }));
    return newSale;
  });
  return result;
};

const updateSaleStatus = async (status, id) => {
  await Sale.update(
    { status },
    { where: { id }, returning: true },
  );
  const result = await Sale.findOne({ where: { id } });
  return result;
};

const getSaleById = async ({ id }) => {
  const data = await Sale.findOne({
    include: [{
      model: Product,
      as: 'products',
      through: { attributes: [] },
    }],
  where: { id },
  });
    if (!data) throw new Error('Sale not found');
    return data;
};

module.exports = { getAllSales, insertSale, updateSaleStatus, getSaleById };
