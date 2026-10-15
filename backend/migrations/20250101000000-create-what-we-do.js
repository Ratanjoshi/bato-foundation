// backend/migrations/20250101000000-create-what-we-do.js
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("what_we_do", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      icon: {
        type: Sequelize.STRING(64),
        allowNull: false,
        defaultValue: "GraduationCap",
      },
      title: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING(140),
        allowNull: false,
        unique: true,
      },
      desc: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      points: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: [],
      },
      image: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        ),
      },
    });

    await queryInterface.addIndex("what_we_do", ["order"]);
    await queryInterface.addIndex("what_we_do", ["isActive"]);
    await queryInterface.addIndex("what_we_do", ["slug"], { unique: true });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("what_we_do");
  },
};
