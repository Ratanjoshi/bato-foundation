"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subscribers extends Model {
    static associate(models) {}
  }
  Subscribers.init(
    {
      email: DataTypes.STRING,
    },
    {
      timestamps: true,
      sequelize,
      modelName: "Subscribers",
      tableName: "subscribers",
    },
  );
  return Subscribers;
};
