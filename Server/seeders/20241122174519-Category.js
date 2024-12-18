'use strict';
const fs = require('fs').promises;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = JSON.parse(await fs.readFile('./data/category.json', 'utf-8'));
    data = data.map(el => {
      delete el.id;
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });

    await queryInterface.bulkInsert('Categories', data, {});

    // Mengatur ulang sequence agar ID dimulai dari 100
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Categories_id_seq" RESTART WITH 4;`
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
