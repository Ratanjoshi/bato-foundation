const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Applicant extends Model {
    static associate(models) {
      Applicant.belongsTo(models.careerModel, {
        foreignKey: "careerId",
        as: "career",
      });
    }
  }

  Applicant.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      careerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mobile_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cv_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("selected", "unselected"),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      sequelize,
      tableName: "applicants",
      modelName: "Applicant",
    },
  );

  return Applicant;
};
