const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class PortfolioSubImage extends Model {
    static associate(models) {
      PortfolioSubImage.belongsTo(models.portfolioModel, {
        foreignKey: "portfolioId",
        as: "portfolio",
      });
    }
  }

  PortfolioSubImage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      svg_string: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      portfolioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "PortfolioSubImage",
      tableName: "portfolioSubImages",
    },
  );

  return PortfolioSubImage;
};
