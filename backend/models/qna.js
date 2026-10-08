"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Qna extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // has many employee  late do--

      this.belongsTo(models.employeeModel, {
        foreignKey: "employeeId",
        onDelete: "CASCADE",
      });
    }
  }

  Qna.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      qno: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      question: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      answer: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "Qna",
      tableName: "qna",
    },
  );

  return Qna;
};
