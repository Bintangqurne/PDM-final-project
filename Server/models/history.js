'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      History.belongsTo(models.Product, {foreignKey: 'productId'})
      History.belongsTo(models.User, {foreignKey: 'userId'})
      History.belongsTo(models.Table, {foreignKey: 'tableId'})
      History.belongsTo(models.Order, {foreignKey: 'orderId'})
    }
  }
  History.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {msg : 'Name tidak boleh kosong'},
        notEmpty: {msg : 'Name tidak boleh kosong'}
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull : {msg : 'price tidak boleh kosong'},
        notEmpty: {msg : 'price tidak boleh kosong'}
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {msg : 'description tidak boleh kosong'},
        notEmpty: {msg : 'description tidak boleh kosong'}
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {msg : 'image tidak boleh kosong'},
        notEmpty: {msg : 'image tidak boleh kosong'}
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull : {msg : 'Id Product tidak boleh kosong'},
        notEmpty : {msg : 'Id Product tidak boleh kosong'}
      }
    },
    userId: {
      type: DataTypes.INTEGER
    },
    orderType: {
      type: DataTypes.STRING,
    },
    tableId: {
      type: DataTypes.INTEGER,
    },
    orderId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};