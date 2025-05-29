const { User, Orders, Token, Sequelize } = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];
const { Op } = Sequelize;

function validateUser(data) {
  const requiredFields = ["name", "email", "password"];

  for (const field of requiredFields) {
    if (!data[field] || data[field].trim() === "") {
      return `El campo '${field}' es obligatorio.`;
    }
  }

  if (!/\S+@\S+\.\S+/.test(data.email)) {
    return "El email no tiene un formato válido.";
  }

  if (data.password.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }

  return null;
}

const UserController = {
  //CREATE
  async insert(req, res) {
    const userError = validateUser(req.body);
    if (userError) {
      return res.status(400).send({ message: userError });
    }

    try {
      const existingUser = await User.findOne({
        where: { email: req.body.email },
      });
      if (existingUser) {
        return res.status(409).send({ message: "El email ya está registrado" });
      }

      req.body.role = "user";
      const passwordEncrypted = bcrypt.hashSync(req.body.password, 10);
      const newUser = await User.create({
        ...req.body,
        password: passwordEncrypted,
      });
      res.status(201).send({ message: "Usuario creado con éxito", newUser });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al crear el usuario" });
    }
  },

  //LOGIN
  login(req, res) {
    User.findOne({ where: { email: req.body.email } }).then((user) => {
      if (!user) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }
      const token = jwt.sign({ id: user.id }, jwt_secret);
      Token.create({ token, UserId: user.id });
      res.send({ message: "Bienvenid@ " + user.name, user, token });
    });
  },

  //LOGOUT
  async logout(req, res) {
    try {
      await Token.destroy({
        where: {
          [Op.and]: [
            { UserId: req.user.id },
            { token: req.headers.authorization },
          ],
        },
      });
      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "hubo un problema al tratar de desconectarte" });
    }
  },

  //READ **Cambiar**
  async getAll(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).send(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener los usuarios" });
    }
  },

  //DELETE
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      await User.destroy({
        where: { id: req.params.id },
      });

      res.status(200).send({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      res.status(500).json({ mensaje: "Error del servidor" });
    }
  },
};

module.exports = UserController;
