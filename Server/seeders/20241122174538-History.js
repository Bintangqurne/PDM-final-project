'use strict';

const fs = require('fs').promises;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = JSON.parse(await fs.readFile('./data/History.json', 'utf-8'));
    data = data.map(el => {
      delete el.id;
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });

    await queryInterface.bulkInsert('Histories', data, {});

    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Histories_id_seq" RESTART WITH 9;`
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Histories', null, {});
  }
};
