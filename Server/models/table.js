'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Table.hasMany(models.History, {foreignKey: 'tableId'})
      Table.hasMany(models.Order, {foreignKey: 'tableId'})
    }
  }
  Table.init({
    tableNumber: DataTypes.INTEGER,
    isAvailable: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Table',
  });
  return Table;
};