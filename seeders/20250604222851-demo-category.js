"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Categories", [
      {
        name: "Atletismo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Baloncesto",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ciclismo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Fútbol",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Natación",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tenis",
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
