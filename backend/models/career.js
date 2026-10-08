const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Career extends Model {
    static associate(models) {
      Career.belongsTo(models.careerCategoryModel, {
        foreignKey: "categoryId",
        as: "category",
      });
      Career.hasMany(models.applicantModel, {
        foreignKey: "careerId",
        as: "applicants",
      });
    }
  }

  Career.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      no_of_opening: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_published: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      specification: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true,
      sequelize,
      tableName: "careers",
      modelName: "Career",
    },
  );

  return Career;
};
