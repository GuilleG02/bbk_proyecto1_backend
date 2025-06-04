"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Products", [
      {
        name: "Balón de baloncesto NBA",
        price: 34.5,
        category_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bicicleta de ruta",
        price: 799.99,
        category_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Balón de fútbol UCL",
        price: 29.99,
        category_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gafas de natación",
        price: 18.75,
        category_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Zapatillas de atletismo",
        price: 89.99,
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
