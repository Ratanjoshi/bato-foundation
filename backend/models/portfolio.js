const { Sequelize, DataTypes } = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Portfolio extends Model {
    static associate(models) {
      Portfolio.hasMany(models.portfolioSubImageModel, {
        foreignKey: "portfolioId",
        as: "subImages",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      Portfolio.hasMany(models.portfolioMediaModel, {
        foreignKey: "portfolioId",
        as: "portfolioMedia",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      Portfolio.hasOne(models.testimonialModel, {
        foreignKey: "portfolioId",
        as: "testimonial",
      });

      Portfolio.hasOne(models.projectRequirementModel, {
        foreignKey: "portfolioId",
        as: "projectRequirement",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      Portfolio.belongsTo(models.serviceModel, {
        foreignKey: {
          allowNull: true,
          name: "serviceId",
        },
        as: "service",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }

  Portfolio.init(
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
      summary: {
        type: DataTypes.TEXT,
      },
      product_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      core_tech_img: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      portfolioImages: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      introduction: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      desktop_view_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mobile_view_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tablet_view_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      portfolioLogo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      business_challenges: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      solutions: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      seo_description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      seo_keywords: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Service",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      projectUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Portfolio",
      tableName: "portfolios",
    },
  );

  return Portfolio;
};
