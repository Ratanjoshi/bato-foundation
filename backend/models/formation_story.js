"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class FormationStory extends Model {
    static associate(models) {
      // define associations here if needed
    }
  }

  FormationStory.init(
    {
      badgeLabel: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "How was BATO Foundation formed?",
      },
      headingLead: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "A road that began with a",
      },
      headingAccent: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "simple belief.",
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "/images/hero/university-lab.jpg",
      },
      imageAlt: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Students collaborating in a computer lab",
      },
      locationLabel: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Registered office",
      },
      locationValue: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Lalitpur",
      },
      introParagraph: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      secondaryParagraph: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      quoteText: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      noteIndex: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "01",
      },
      noteLabel: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Founding Note",
      },
      noteTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      noteParagraph1: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      noteParagraph2: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      noteParagraph3: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      noteFooter: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Technology · Learning · Opportunity",
      },
    },
    {
      sequelize,
      modelName: "FormationStory",
      tableName: "formation_stories",
      timestamps: true,
    },
  );

  return FormationStory;
};
