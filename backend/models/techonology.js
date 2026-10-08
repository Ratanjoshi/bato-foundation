const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Technology extends Model {
    static associate(models) {
      // Many-to-Many: A technology can belong to multiple stacks
      Technology.belongsToMany(models.technologyStackModel, {
        through: "technology_stack_technologies",
        foreignKey: "technologyId",
        otherKey: "technologyStackId",
        as: "stacks",

        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }

  Technology.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "Technology",
      tableName: "technologies",
    },
  );

  return Technology;
};
