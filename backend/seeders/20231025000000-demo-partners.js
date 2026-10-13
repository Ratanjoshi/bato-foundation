"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Delete all existing partners to prevent duplicates
    await queryInterface.bulkDelete("Partners", null, {});

    // 2. Insert the fresh data
    await queryInterface.bulkInsert(
      "Partners",
      [
        {
          name: "Global Health Initiative",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tech For Good",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Community First",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "EcoAction Network",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Education For All",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Partners", null, {});
  },
};
