const { Sequelize, DataTypes } = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Testimonial extends Model {
    static associate(models) {
      Testimonial.belongsTo(models.portfolioModel, {
        foreignKey: "portfolioId",
        as: "portfolio",
      });
    }
  }

  Testimonial.init(
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
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      portfolioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Testimonial",
      tableName: "testimonials",
      timestamps: true,
    },
  );

  return Testimonial;
};
