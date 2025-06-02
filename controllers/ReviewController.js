const { Review, Product, ProductReview, User } = require("../models");

const ReviewController = {

 async create(req, res, next) {
  try {
    const { content, rating, user_id, product_id } = req.body;
    const userId = req.user?.id || user_id;

    if (!userId || !product_id) {
      return res.status(400).json({ error: "Faltan user_id o product_id" });
    }

    const review = await Review.create({
      content,
      rating,
      user_id: userId,
      product_id, // Ya que Review ahora tiene FK directa a producto
    });

    res.status(201).json({ message: "Review creada", review });
  } catch (err) {
    next(err);
  }
},


  async getAll(req, res) {
    try {
      const reviews = await Review.findAll({
        include: [
          { model: User, as: "user", attributes: ["id", "name", "email"] },
          { model: Product, as: "product" },
        ],
      });
      res.json(reviews);
    } catch (err) {
      res.status(500).json({ error: "Error al obtener las reviews" });
    }
  },

  async update(req, res, next) {
    try {
      const review = await Review.findByPk(req.params.id);
      if (!review) return res.status(404).json({ error: "Review no encontrada" });

      await review.update(req.body);
      res.json({ message: "Review actualizada", review });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res) {
    try {
      const review = await Review.findByPk(req.params.id);
      if (!review) return res.status(404).json({ error: "Review no encontrada" });

      await review.destroy();
      res.json({ message: "Review eliminada" });
    } catch (err) {
      res.status(500).json({ error: "Error al eliminar la review" });
    }
  },


 async getById(req, res) {
  try {
    const review = await Review.findByPk(req.params.id, {
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
       { model: Product, as: "product" },  
      ],
    });

    if (!review) {
      return res.status(404).json({ error: "Review no encontrada" });
    }

    res.json(review);
  } catch (err) {
  console.error(err);  // Aquí ves qué está pasando
  res.status(500).json({ error: "Error al obtener la review" });
}
 }


};

module.exports = ReviewController;
