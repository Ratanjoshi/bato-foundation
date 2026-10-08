const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class TechnologyStack extends Model {
    static associate(models) {
      // Many-to-Many relationship with Technology
      TechnologyStack.belongsToMany(models.technologyModel, {
        through: "technology_stack_technologies",
        foreignKey: "technologyStackId",
        otherKey: "technologyId",
        as: "technologies",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      // Many-to-Many relationship with Service
      TechnologyStack.belongsTo(models.serviceModel, {
        foreignKey: "serviceId",
        as: "service",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }

  TechnologyStack.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "technologystack",
      modelName: "TechnologyStack",
      timestamps: true,
    },
  );

  return TechnologyStack;
};
