const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CareerCategory extends Model {
    static associate(models) {
      CareerCategory.hasMany(models.careerModel, {
        foreignKey: "categoryId",
        as: "career",
      });
    }
  }

  CareerCategory.init(
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
        allowNull: false,
      },
    },
    {
      timestamps: true,
      sequelize,
      tableName: "career_categories",
      modelName: "CareerCategory",
    },
  );

  return CareerCategory;
};
