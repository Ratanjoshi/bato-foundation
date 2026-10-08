"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("services", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      img_path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      seo_title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      seo_author: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      seo_keywords: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      seo_og_title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      seo_description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      summary: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // An index explicitly for better performance
    await queryInterface.addIndex("services", ["slug"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("services", ["slug"]);
    await queryInterface.dropTable("services");
  },
};
