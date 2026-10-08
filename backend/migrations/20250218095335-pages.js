"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("pages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      header_title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      page_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      og_title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      og_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      og_description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      meta_title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      meta_description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      meta_keywords: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("pages");
  },
};
