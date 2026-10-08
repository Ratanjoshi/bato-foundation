"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("employees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      initials: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      office_location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      round_img: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      entered_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      departmentId: {
        type: Sequelize.INTEGER,
        references: {
          model: "departments", // Matches the table name of the Department model
          key: "id",
        },
        onUpdate: "CASCADE",
      },
      subDepartment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      web_view_img: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      mobile_view_img: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      emp_carousel_img: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      emp_carousel_hov_img: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      emp_quote_img_one: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      emp_quote_img_two: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      designation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      message_img: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      message_title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      work_style_interview_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("employees");
  },
};
