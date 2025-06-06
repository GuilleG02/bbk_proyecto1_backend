"use strict";

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        name: "Iam",
        email: "iam@example.com",
        password: bcrypt.hashSync("1234567", 10),
        role: "admin",
        confirmed: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Anya",
        email: "anya@example.com",
        password: bcrypt.hashSync("1234567", 10),
        role: "user",
        confirmed: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nova",
        email: "nova@example.com",
        password: bcrypt.hashSync("1234567", 10),
        role: "user",
        confirmed: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Owen",
        email: "owen@example.com",
        password: bcrypt.hashSync("1234567", 10),
        role: "user",
        confirmed: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Leon",
        email: "leon@example.com",
        password: bcrypt.hashSync("1234567", 10),
        role: "user",
        confirmed: 1,
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
