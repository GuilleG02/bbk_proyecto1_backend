"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Reviews", [
      {
        content: "Excelente para disfrutar con tus amigos en la cancha.",
        rating: 5,
        user_id: 2,
        product_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "Muy buena para entrenamientos largos, ligera y rápida.",
        rating: 4,
        user_id: 3,
        product_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "Calidad UEFA auténtica, perfecta para partidos intensos.",
        rating: 5,
        user_id: 5,
        product_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "Buena visibilidad bajo el agua, se ajustan cómodamente.",
        rating: 4,
        user_id: 1,
        product_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "Las peores zapatillas que he usado para correr en pista.",
        rating: 1,
        user_id: 4,
        product_id: 5,
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
