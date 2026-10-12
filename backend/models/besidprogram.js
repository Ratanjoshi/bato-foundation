"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BesidesProgram extends Model {
    static associate(models) {
      // No relations for this table
    }
  }

  BesidesProgram.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      icon: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Icon is required" },
          len: { args: [1, 50], msg: "Icon name too long" },
        },
      },

      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Title is required" },
          len: { args: [1, 100], msg: "Title too long" },
        },
      },

      description: {
        type: DataTypes.STRING(300),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Description is required" },
          len: { args: [1, 300], msg: "Description too long" },
        },
      },

      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: { args: [0], msg: "Order must be >= 0" },
        },
      },

      isPublished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "BesidesProgram",
      tableName: "besides_programs",
      indexes: [{ fields: ["isPublished"] }, { fields: ["order"] }],
    },
  );

  return BesidesProgram;
};
