"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // Una review pertenece a un usuario
      Review.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "CASCADE",
      });

      // Una review pertenece a un producto
      Review.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
        onDelete: "CASCADE",
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
          notNull: { msg: "El user_id es obligatorio" },
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "El product_id debe ser un número entero" },
          notNull: { msg: "El product_id es obligatorio" },
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
