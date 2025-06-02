
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProductReview extends Model {
    static associate(models) {
      ProductReview.belongsTo(models.Product, {
        foreignKey: "product_id",
        onDelete: "CASCADE",
      });
      ProductReview.belongsTo(models.Review, {
        foreignKey: "review_id",
        onDelete: "CASCADE",
      });
    }
  }

  ProductReview.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      review_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductReview",
    }
  );

  return ProductReview;
};
