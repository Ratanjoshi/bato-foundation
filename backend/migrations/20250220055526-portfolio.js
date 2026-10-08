"use strict";

const { allow } = require("joi");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("portfolios", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      serviceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "services",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      summary: {
        type: Sequelize.TEXT,
      },
      product_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      core_tech_img: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      portfolioImages: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      projectUrl: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      introduction: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      business_challenges: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      solutions: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      desktop_view_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      mobile_view_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tablet_view_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      portfolioLogo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      seo_description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      seo_keywords: {
        type: Sequelize.JSON,
        allowNull: true,
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
  down: async (queryInterface) => {
    await queryInterface.dropTable("portfolios");
  },
};
