const {
  User,
  Order,
  Product,
  Token,
  Sequelize,
} = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");
const { jwt_secret } = require("../config/config.json")["development"];
const { Op } = Sequelize;
const transporter = require("../config/nodemailer");

const UserController = {
  //CREATE
  async insert(req, res, next) {
    try {
      const existingUser = await User.findOne({
        where: { email: req.body.email },
      });
      if (existingUser) {
        return res.status(409).send({ message: "El email ya está registrado" });
      }

      if (req.body.password.length < 6 || req.body.password.length > 16) {
        return res.status(400).send({
          message: "La contraseña debe tener entre 6 y 16 caracteres",
        });
      }

      req.body.role = "user";
      const userCount = await User.count();
      if (userCount === 0) {
        req.body.role = "superadmin";
      }

      const passwordEncrypted = bcrypt.hashSync(req.body.password, 10);
      const newUser = await User.create({
        ...req.body,
        password: passwordEncrypted,
        confirmed: false,
      });

      const emailToken = jwt.sign({ email: req.body.email }, jwt_secret, {
        expiresIn: "48h",
      });
      const url = "http://localhost:3001/users/confirm/" + emailToken;

      await transporter.sendMail({
        to: req.body.email,
        subject: "Confirme su registro",
        html: `
         <h3>Bienvenido, estás a un paso de registrarte </h3>
         <a href=${url}> Click para confirmar tu registro</a>
       `,
      });

      res.status(201).send({ message: "Usuario creado con éxito", newUser });
    } catch (error) {
      console.error(error);
      next(error);
      res.status(500).send({ message: "Error al crear el usuario" });
    }
  },

  //CONFIRM USER
  async confirm(req, res) {
    try {
      const token = req.params.emailToken;
      const payload = jwt.verify(token, jwt_secret);
      await User.update(
        { confirmed: true },
        {
          where: {
            email: payload.email,
          },
        }
      );
      res.status(201).send("Usuario confirmado con éxito");
    } catch (error) {
      console.error(error);
    }
  },

  //READ
  async getAll(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).send(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener los usuarios" });
    }
  },

  //CHANGE ROL
  async changeRol(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      if (req.params.id == 1) {
        return res.json({
          message:
            "No tienes autorización para cambiar el role de este usuario",
        });
      }

      const { role } = req.body;
      const allowedRoles = ["user", "admin"];
      if (!role || !allowedRoles.includes(role)) {
        return res
          .status(400)
          .json({ error: "Role no válido. Solo se permiten 'user' o 'admin'" });
      }

      await user.update({ role });
      res.json({ message: "Role modificado con éxito", user });
    } catch (err) {
      res.status(500).json({ error: "Error al actualizar el usuario" });
    }
  },

  //DELETE
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      if (req.params.id == 1) {
        return res.json({
          message: "No tienes autorización para eliminar este usuario",
        });
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

  //LOGIN
  async login(req, res) {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      const isMatch = bcrypt.compareSync(req.body.password, user.password);

      if (!user || !isMatch) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }
      if (!user.confirmed) {
        return res.status(400).send({ message: "Debes confirmar tu correo" });
      }

      const token = jwt.sign({ id: user.id }, jwt_secret);
      Token.create({ token, UserId: user.id });
      res.send({ message: "Bienvenid@ " + user.name, user, token });
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
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
        .send({ message: "Hubo un problema al tratar de desconectarte" });
    }
  },

  //USER-ORDERS
  async getMyOrders(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: ["name"],
        include: [
          {
            model: Order,
            include: [
              {
                model: Product,

                through: {
                  attributes: [],
                },
              },
            ],
          },
        ],
      });

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      res.json(user);
    } catch (error) {
      console.error(err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
};

module.exports = UserController;
