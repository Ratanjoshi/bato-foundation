const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class BlogCategory extends Model {
    static associate(models) {
      this.hasMany(models.blogModel, {
        foreignKey: "blogCategoryId",
        as: "blogs",
      });
    }
  }

  BlogCategory.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "BlogCategory",
      tableName: "blogCategories",
    },
  );
  return BlogCategory;
};
