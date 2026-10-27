"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Timeline extends Model {
    static associate(models) {
      // define associations here if needed
    }
  }

  Timeline.init(
    {
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      year: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Timeline",
      tableName: "Timelines",
    },
  );

  return Timeline;
};
