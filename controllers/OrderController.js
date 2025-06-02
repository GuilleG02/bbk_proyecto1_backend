const { Order, Product } = require('../models');

const OrderController = {

  
  async getAllOrders(req, res) {
    try {
      const orders = await Order.findAll({
        include: [{
          model: Product,
          through: { attributes: [] } 
        }]
      });

      if (!orders || orders.length === 0) {
        return res.status(404).json({ error: 'No se encontraron pedidos' });
      }

      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los pedidos' });
    }
  },

  async createOrder(req, res) {
  try {
    const { products, user_id } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: 'Se requiere una lista de productos' });
    }
    if (!user_id) {
      return res.status(400).json({ error: 'Se requiere user_id para la orden' });
    }

    const newOrder = await Order.create({ user_id });

    await newOrder.addProducts(products);

    const orderWithProducts = await Order.findByPk(newOrder.id, {
      include: [{ model: Product, through: { attributes: [] } }]
    });

    res.status(201).json(orderWithProducts);
  } catch (error) {
    console.error('Error creando pedido:', error);
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
}

}


module.exports = OrderController;