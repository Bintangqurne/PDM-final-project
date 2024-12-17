'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      productId: {
        type: Sequelize.INTEGER,
        references:{
          model: "Products",
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      orderType: {
        type: Sequelize.STRING,
      },
      tableId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tables',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      orderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Histories');
  }
};