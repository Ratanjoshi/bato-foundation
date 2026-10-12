"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BatoProgram extends Model {
    static associate(models) {
      // Add relationships here later if BATO programs
      // need to connect with other tables.
    }
  }

  BatoProgram.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("Ongoing", "Upcoming", "Completed"),
        allowNull: false,
        defaultValue: "Upcoming",
      },

      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      longDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      isPublished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "BatoProgram",
      tableName: "bato_programs",
    },
  );

  return BatoProgram;
};
