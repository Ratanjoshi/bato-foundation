"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AboutPreview extends Model {
    static associate(models) {
      // No relations
    }
  }

  AboutPreview.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      badge: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      paragraph1: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      paragraph2: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      buttonText: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      buttonLink: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      imageAlt: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      floatingTitle: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      floatingText: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
      modelName: "AboutPreview",
      tableName: "about_previews",
    },
  );

  return AboutPreview;
};
