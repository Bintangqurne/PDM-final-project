'use strict';

const fs = require('fs').promises;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = JSON.parse(await fs.readFile('./data/Table.json', 'utf-8'));
    data = data.map(el => {
      delete el.id;
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });

    await queryInterface.bulkInsert('Tables', data, {});

    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Tables_id_seq" RESTART WITH 21;`
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tables', null, {});
  }
};
