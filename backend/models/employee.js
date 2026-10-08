"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.departmentModel, {
        foreignKey: "departmentId",
      });
      this.hasMany(models.qnaModel, {
        foreignKey: "employeeId",
        as: "qna",
      });
    }
  }

  Employee.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      initials: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      office_location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      entered_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subDepartment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      web_view_img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mobile_view_img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      round_img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emp_carousel_img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      emp_carousel_hov_img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      emp_quote_img_one: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      emp_quote_img_two: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      message_img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      message_title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      work_style_interview_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "Employee",
      tableName: "employees",
    },
  );

  return Employee;
};
