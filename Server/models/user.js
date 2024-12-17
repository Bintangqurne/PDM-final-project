'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.History, {foreignKey: 'userId'})
      User.hasMany(models.Order, {foreignKey: 'userId'})
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull : {msg: 'email tidak boleh kosong'},
        notEmpty : {msg: 'email tidak boleh kosong'},
        isEmail : {msg: 'isi harus email'}
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {msg: 'password tidak boleh kosong'},
        notEmpty : {msg: 'password tidak boleh kosong'},
        len : [5, Infinity]
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Customer'
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  })
  return User;
};