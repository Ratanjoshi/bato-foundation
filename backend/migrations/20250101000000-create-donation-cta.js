"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("donation_ctas", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      eyebrow: {
        type: Sequelize.STRING(40),
        allowNull: false,
        defaultValue: "Donate",
      },
      heading: { type: Sequelize.STRING(140), allowNull: false },
      description: { type: Sequelize.STRING(500), allowNull: false },
      primary_label: {
        type: Sequelize.STRING(60),
        allowNull: false,
        defaultValue: "Donate Now",
      },
      primary_href: {
        type: Sequelize.STRING(200),
        allowNull: false,
        defaultValue: "/donate",
      },
      secondary_label: {
        type: Sequelize.STRING(60),
        allowNull: false,
        defaultValue: "Where Your Gift Goes",
      },
      secondary_href: {
        type: Sequelize.STRING(200),
        allowNull: false,
        defaultValue: "/donate#usage",
      },
      image_url: { type: Sequelize.STRING(500), allowNull: false },
      image_alt: { type: Sequelize.STRING(160), allowNull: true },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("donation_ctas");
  },
};
