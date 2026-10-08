const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class TechnologyStackTechnology extends Model {}

  TechnologyStackTechnology.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      technologyStackId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "technologystack", // reference to TechnologyStack
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      technologyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "technologies", // reference to Technology
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      tableName: "technology_stack_technologies",
      modelName: "TechnologyStackTechnology",
      timestamps: true,
    },
  );

  return TechnologyStackTechnology;
};
