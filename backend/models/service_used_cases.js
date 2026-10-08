const { Sequelize, DataTypes, DATEONLY } = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ServiceUsedCases extends Model {
    static associate(models) {
      this.belongsTo(models.serviceModel, {
        foreignKey: "serviceId",
        as: "service",
      });
    }
  }
  ServiceUsedCases.init(
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
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      img_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "service_used_cases",
      modelName: "ServiceUsedCase",
    },
  );

  return ServiceUsedCases;
};
