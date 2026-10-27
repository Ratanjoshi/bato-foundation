"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class LeadershipMember extends Model {
    static associate(models) {
      // define associations here if needed in the future
    }
  }

  LeadershipMember.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      portfolio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      published: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "LeadershipMember",
      tableName: "LeadershipMembers", // Explicitly name the table
    },
  );

  return LeadershipMember;
};
