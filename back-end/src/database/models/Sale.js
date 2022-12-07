module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: false,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: false,
    },
    totalPrice: DataTypes.DECIMAL(9,2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pendente'
    }
  },
  {
    timestamps: false,
    underscored: true,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user',
    });
    Sale.belongsTo(models.User, {
      foreignKey: 'sellerId', as: 'seller',
    });
  }
  return Sale;
};