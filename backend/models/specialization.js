const { Sequelize, DataTypes } = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Specialization extends Model {
    static associate(models) {}
  }

  Specialization.init(
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Specialization",
      tableName: "specializations",
      underscored: true,
    },
  );

  return Specialization;
};
