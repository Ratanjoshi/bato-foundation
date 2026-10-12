"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("besides_programs", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      icon: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: "Lucide icon name e.g. FlaskConical, Lightbulb",
      },

      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },

      description: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },

      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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

    // Helpful indexes for fast admin listing
    await queryInterface.addIndex("besides_programs", ["isPublished"], {
      name: "besides_programs_is_published_idx",
    });

    await queryInterface.addIndex("besides_programs", ["order"], {
      name: "besides_programs_order_idx",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("besides_programs");
  },
};
