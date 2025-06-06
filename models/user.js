"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Review, { foreignKey: "user_id" });
      User.hasMany(models.Order, {
        foreignKey: "user_id",
      });
      User.hasOne(models.Token, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Por favor introduce tu nombre" },
          notEmpty: { msg: "Por favor introduce un nombre válido" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Por favor introduce tu correo" },
          isEmail: { msg: "Por favor introduce un correo válido" },
        },
      },
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      confirmed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
