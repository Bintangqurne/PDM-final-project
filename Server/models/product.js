'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The models/index file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {foreignKey: 'categoryId'})
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {msg : 'Name tidak boleh kosong'},
        notEmpty: {msg : 'Name tidak boleh kosong'}
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull : {msg : 'price tidak boleh kosong'},
        notEmpty: {msg : 'price tidak boleh kosong'}
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull : {msg : 'amount tidak boleh kosong'},
        notEmpty: {msg : 'amount tidak boleh kosong'}
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
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull : {msg : 'Id Category tidak boleh kosong'},
        notEmpty : {msg : 'Id Category tidak boleh kosong'}
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};