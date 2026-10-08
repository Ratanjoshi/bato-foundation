const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Service extends Model {
    static associate(models) {
      // Many-to-Many with TechnologyStack
      // Service.belongsToMany(models.technologyStackModel, {
      //   through: "service_technology_stacks",
      //   foreignKey: "serviceId",
      //   otherKey: "technologyStackId",
      //   as: "technologyStacks",
      //   onUpdate: "CASCADE",
      //   onDelete: "CASCADE",
      // });
      Service.hasMany(models.technologyStackModel, {
        foreignKey: "serviceId",
        as: "techStacks",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      Service.hasMany(models.serviceUsedCaseModel, {
        foreignKey: "serviceId",
        as: "useCases",
      });
    }
  }

  Service.init(
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
      img_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      seo_title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      seo_author: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      seo_keywords: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      seo_og_title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      seo_description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Service",
      tableName: "services",
      timestamps: true,
    },
  );

  return Service;
};
