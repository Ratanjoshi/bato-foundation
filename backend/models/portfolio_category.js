const { Sequelize, DataTypes } = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PortfolioCategory extends Model {
    static associate(models) {}
  }
  PortfolioCategory.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      sequelize,
      tableName: "portfolio_categories",
      modelName: "PortfolioCategory",
    },
  );

  return PortfolioCategory;
};
