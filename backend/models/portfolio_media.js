const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class PortfolioMedia extends Model {
    static associate(models) {
      // ProductMedia belongs to a Product
      PortfolioMedia.belongsTo(models.portfolioModel, {
        foreignKey: "portfolioId",
        as: "portfolio",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }

  PortfolioMedia.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      portfolioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "portfolios",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "PortfolioMedia",
      tableName: "portfolioMedia",
    },
  );

  return PortfolioMedia;
};
