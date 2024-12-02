'use strict';

const fs = require('fs').promises;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = JSON.parse(await fs.readFile('./data/Product.json', 'utf-8'));
    data = data.map(el => {
      delete el.id;
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });

    await queryInterface.bulkInsert('Products', data, {});

    // Reset sequence untuk tabel Products agar ID mulai dari 100
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Products_id_seq" RESTART WITH 9;`
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
