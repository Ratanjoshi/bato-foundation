// backend/models/WhatWeDo.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class WhatWeDo extends Model {
    static associate(models) {
      // No associations yet
    }
  }

  WhatWeDo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      icon: {
        type: DataTypes.STRING(64),
        allowNull: false,
        defaultValue: "GraduationCap",
      },
      title: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(140),
        allowNull: false,
        unique: true,
      },
      desc: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      points: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "WhatWeDo",
      tableName: "what_we_do",
      timestamps: true,
    },
  );

  return WhatWeDo;
};
