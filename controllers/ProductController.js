
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
},


// Funcion de filtrar por nombre

async getByName(req, res) {
    try {
      const { name } = req.params;

      const product = await Product.findOne({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        },
        include: [{ model: Category }]
      });

      if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

      res.json(product);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener el producto por nombre' });
    }
  },


// Funcion de filtrar productos por precio
async getByPrice(req, res) {
  try {
    const { price } = req.params;

    const products = await Product.findAll({
      where: {
        price: price
      },
      include: [{ model: Category }]
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'No se encontraron productos con ese precio' });
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los productos por precio' });
  }
},


// Funcion de ordenar productos de mayor a menor precio
async getByPriceDesc(req, res) {
  try {
    const products = await Product.findAll({
      order: [['price', 'DESC']],
      include: [{ model: Category }]
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'No se encontraron productos' });
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los productos por precio' });
  }

}


}

module.exports = ProductController;

// module exports se utiliza aqui para no tener que repetirlo y añadirlo en cada funcion
