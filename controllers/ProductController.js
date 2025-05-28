
const { Product, Category } = require('../models');

// Funcion de crear
exports.create = async (req, res) => {
  const error = validateProduct(req.body);
  if (error) return res.status(400).json({ error });

  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};


// Funcion de actualizar
exports.update = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    await product.update(req.body);
    res.json(product);
  } catch (err) {

    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};


// Funcion de borrar
exports.delete = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    await product.destroy();
    res.json({ message: 'Producto eliminado' });
  } catch (err) {

    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};


// Funcion de mostrar
exports.getAll = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }]

    });
    res.json(products);

  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};


// Funcion de mostrar por Id
exports.getById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }]

    });

    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};