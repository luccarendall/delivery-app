'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userId: {
        field: 'user_id',
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      sellerId: {
        field: 'seller_id',
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      totalPrice: {
        field: 'total_price',
        type: Sequelize.DECIMAL(9,2),
        allowNull: false
      },
      deliveryAddress: {
        field: 'delivery_address',
        type: Sequelize.STRING,
        allowNull: false
      },
      deliveryNumber: {
        field: 'delivery_number',
        type: Sequelize.STRING,
        allowNull: false
      },
      saleDate: {
        field: 'sale_date',
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pendente'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sales');
  }
};
