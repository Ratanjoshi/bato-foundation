const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Subscription extends Model {
    static associate(models) {}
  }

  Subscription.init(
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      button_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      button_action: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "subscription",
      modelName: "Subscription",
      timestamps: true,
    },
  );

  return Subscription;
};
