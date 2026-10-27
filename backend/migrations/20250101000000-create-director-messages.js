"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("director_messages", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      org: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      photo: {
        type: Sequelize.STRING(500),
        allowNull: true,
        defaultValue: null,
      },
      message: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: [],
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });

    await queryInterface.addIndex("director_messages", ["isActive"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("director_messages");
  },
};
