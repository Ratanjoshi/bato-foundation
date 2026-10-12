"use strict";

module.exports = (sequelize, DataTypes) => {
  const UltimateDream = sequelize.define(
    "UltimateDream",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      eyebrow: {
        type: DataTypes.STRING(80),
        allowNull: false,
        defaultValue: "Our Ultimate Dream",
      },
      heading: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      button_label: {
        type: DataTypes.STRING(60),
        allowNull: false,
        defaultValue: "Help Build the Dream",
      },
      button_href: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "/donate",
      },
      image_url: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      image_alt: {
        type: DataTypes.STRING(160),
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: "ultimate_dreams",
      underscored: true,
      timestamps: true,
    },
  );

  return UltimateDream;
};
