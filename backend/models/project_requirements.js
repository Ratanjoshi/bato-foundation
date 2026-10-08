const { Sequelize, DataTypes } = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProjectRequirement extends Model {
    static associate(models) {
      // One ProjectRequirement belongs to one Portfolio
      ProjectRequirement.belongsTo(models.portfolioModel, {
        foreignKey: "portfolioId",
        as: "portfolio",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      // One ProjectRequirement has many Requirements
      // ProjectRequirement.hasMany(models.requirementModel, {
      //   foreignKey: "projectRequirementId",
      //   as: "requirements",
      //   onUpdate: "CASCADE",
      //   onDelete: "CASCADE",
      // });
    }
  }

  ProjectRequirement.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // description: {
      //   type: DataTypes.TEXT,
      //   allowNull: false,
      // },
      requirements: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "ProjectRequirement",
      tableName: "project_requirements",
    },
  );

  return ProjectRequirement;
};
