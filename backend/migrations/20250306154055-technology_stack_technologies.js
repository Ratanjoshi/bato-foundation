"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("technology_stack_technologies", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      technologyStackId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "technologystack", // reference to TechnologyStack
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      technologyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "technologies", // reference to Technology
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("technology_stack_technologies");
  },
};
