"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class DirectorMessage extends Model {
    static associate(models) {
      // No associations needed for now
    }
  }

  DirectorMessage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name cannot be empty" },
          len: {
            args: [2, 150],
            msg: "Name must be between 2 and 150 characters",
          },
        },
      },
      role: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Role cannot be empty" },
          len: {
            args: [2, 150],
            msg: "Role must be between 2 and 150 characters",
          },
        },
      },
      org: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Organization cannot be empty" },
        },
      },
      photo: {
        type: DataTypes.STRING(500),
        allowNull: true,
        defaultValue: null,
      },
      message: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
        validate: {
          isValidMessage(value) {
            if (!Array.isArray(value)) {
              throw new Error("Message must be an array of paragraphs");
            }
            if (value.length === 0) {
              throw new Error("Message must contain at least one paragraph");
            }
            value.forEach((p) => {
              if (typeof p !== "string" || p.trim().length === 0) {
                throw new Error("Each paragraph must be a non-empty string");
              }
            });
          },
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "DirectorMessage",
      tableName: "director_messages",
      timestamps: true,
      indexes: [{ fields: ["isActive"] }],
    },
  );

  return DirectorMessage;
};
