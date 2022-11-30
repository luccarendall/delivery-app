const { SaleProduct, Sale, sequelize } = require('../database/models');

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

module.exports = { insertSale };