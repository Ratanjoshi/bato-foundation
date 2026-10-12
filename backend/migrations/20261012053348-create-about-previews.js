"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("about_previews", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      badge: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      paragraph1: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      paragraph2: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      buttonText: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      buttonLink: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      imageAlt: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      floatingTitle: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      floatingText: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      isPublished: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
  },

  async down(queryInterface) {
    await queryInterface.dropTable("about_previews");
  },
};
