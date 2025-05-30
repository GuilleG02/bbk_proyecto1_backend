
const { Product, Category } = require('../models');

const ProductController = {

// Funcion de crear
async create(req, res) {

  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
    console.log('Creando el producto')
  } catch (err) {
    
    res.status(500).json({ error: 'Error al crear el producto' });
  }
},


// Funcion de actualizar
async update(req, res) {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    await product.update(req.body);
    res.json(product);
  } catch (err) {

    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
},


// Funcion de borrar
async delete(req, res) {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    await product.destroy();
    res.json({ message: 'Producto eliminado' });
  } catch (err) {

    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
},


// Funcion de mostrar
async getAll(req, res) {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }]

    });
    res.json(products);

  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
},


// Funcion de mostrar por Id
async getById(req, res) {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }]

    });

    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
}

}

module.exports = ProductController;

// module exports se utiliza aqui para no tener que repetirlo y añadirlo en cada funcion
