const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Requirement extends Model {
    static associate(models) {
      // Many Requirements belong to one ProjectRequirement
      Requirement.belongsTo(models.projectRequirementModel, {
        foreignKey: "projectRequirementId",
        as: "projectRequirement",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }

  Requirement.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      projectRequirementId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "project_requirements",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      requirementText: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Requirement",
      tableName: "requirements",
    },
  );

  return Requirement;
};
