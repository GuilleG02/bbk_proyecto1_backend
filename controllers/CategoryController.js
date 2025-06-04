const { Category, Product } = require("../models/index");
const { Op } = require("sequelize");

const CategoryController = {
  //CREATE
  insert(req, res) {
    Category.create(req.body)
      .then((category) => {
        res
          .status(201)
          .json({ message: "Categoría creada exitosamente", category });
      })
      .catch((err) => console.error(err));
  },

  //READ
  async getAll(req, res) {
    try {
      const categories = await Category.findAll();
      res.status(200).send(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener las categorías" });
    }
  },

  //UPDATE
  async update(req, res) {
    try {
      await Category.update(req.body, {
        where: { id: req.params.id },
      });
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Categoría no encontrada" });
      }
      res.status(200).send("Categoría actualizada con éxito");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "no ha sido posible actualizar la categoría" });
    }
  },

  //DELETE
  async delete(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Categoría no encontrada" });
      }
      await Category.destroy({
        where: { id: req.params.id },
      });

      res.status(200).send({ message: "Categoría eliminada correctamente" });
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      res.status(500).json({ mensaje: "Error del servidor" });
    }
  },

  //CATEGORIES-PRODUCTS
  async getCategoryProducts(req, res) {
    try {
      const categories = await Category.findAll({
        include: [{ model: Product }],
      });
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error al obtener categorías con productos:", error);
      res.status(500).json({ message: "Error del servidor" });
    }
  },

  //CATEGORY BY ID
  async getById(req, res) {
    try {
      const category = await Category.findByPk(req.params.id, {
        include: [{ model: Product }],
      });
      if (!category) {
        return res.status(404).json({ message: "Categoría no encontrada" });
      }
      res.status(200).json(category);
    } catch (error) {
      console.error("Error al obtener la categoría:", error);
      res.status(500).json({ message: "Error del servidor" });
    }
  },

  //CATEGORY BY NAME
  async getByName(req, res) {
    const { name } = req.params;
    try {
      const category = await Category.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
        include: [{ model: Product }],
      });
      if (!category) {
        return res.status(404).json({ message: "Categoría no encontrada" });
      }
      res.status(200).json(category);
    } catch (error) {
      console.error("Error al buscar categoría por nombre:", error);
      res.status(500).json({ message: "Error del servidor" });
    }
  },
};

module.exports = CategoryController;
