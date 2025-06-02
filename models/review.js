
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "CASCADE",
      });

      Review.belongsToMany(models.Product, {
        through: models.ProductReview,
        foreignKey: "review_id",
        as: "products",
      });
    }
  }

  Review.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "El contenido no puede estar vacío" },
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: { args: [1], msg: "La puntuación mínima es 1" },
          max: { args: [5], msg: "La puntuación máxima es 5" },
          isInt: { msg: "La puntuación debe ser un número entero" },
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "El user_id debe ser un número entero" },
        },
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );

  return Review;
};
