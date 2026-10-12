"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ultimate_dreams", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      eyebrow: {
        type: Sequelize.STRING(80),
        allowNull: false,
        defaultValue: "Our Ultimate Dream",
      },
      heading: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      button_label: {
        type: Sequelize.STRING(60),
        allowNull: false,
        defaultValue: "Help Build the Dream",
      },
      button_href: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: "/donate",
      },
      image_url: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      image_alt: {
        type: Sequelize.STRING(160),
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        ),
      },
    });

    await queryInterface.addIndex("ultimate_dreams", ["is_active", "order"], {
      name: "ultimate_dreams_active_order_idx",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("ultimate_dreams");
  },
};
