"use strict";

module.exports = (sequelize, DataTypes) => {
  const DonationCta = sequelize.define(
    "DonationCta",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      eyebrow: {
        type: DataTypes.STRING(40),
        allowNull: false,
        defaultValue: "Donate",
      },
      heading: {
        type: DataTypes.STRING(140),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      primary_label: {
        type: DataTypes.STRING(60),
        allowNull: false,
        defaultValue: "Donate Now",
      },
      primary_href: {
        type: DataTypes.STRING(200),
        allowNull: false,
        defaultValue: "/donate",
      },
      secondary_label: {
        type: DataTypes.STRING(60),
        allowNull: false,
        defaultValue: "Where Your Gift Goes",
      },
      secondary_href: {
        type: DataTypes.STRING(200),
        allowNull: false,
        defaultValue: "/donate#usage",
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
    },
    {
      tableName: "donation_ctas",
      underscored: true,
      timestamps: true,
    },
  );

  return DonationCta;
};
