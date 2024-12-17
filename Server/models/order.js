'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.Table, {foreignKey: 'tableId'})
      Order.belongsTo(models.User, {foreignKey: 'userId'})
      Order.hasMany(models.History, {foreignKey: 'orderId'})
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    orderType: DataTypes.STRING,
    tableId: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
          min: 1,
          notNull: { msg: 'Quantity tidak boleh kosong' },
      }
  }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};