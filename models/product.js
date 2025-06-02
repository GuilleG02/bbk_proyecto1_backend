"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: "category_id",
      });
      Product.belongsToMany(models.Order, {
        through: models.OrderProduct,
        foreignKey: "product_id",
      });
    }
  }

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El nombre del producto no puede estar vacío",
          },
          len: {
            args: [2, 100],
            msg: "El nombre debe tener entre 2 y 100 caracteres",
          },
        },
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: {
            msg: "El precio debe ser un número decimal válido",
          },
          min: {
            args: [0],
            msg: "El precio no puede ser negativo",
          },
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "El ID de la categoría debe ser un número entero",
          },
          notNull: {
            msg: "La categoría es obligatoria",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  return Product;
};

