import express from 'express';
const router = express.Router();
import Cart from '../models/CartModel.js';

router.get('/', function(req, res, next) {
  res.render('cart.hbs', { title: 'Express' });
});

router.post('/add', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cartItem = await Cart.create({ userId: req.user.id, dishId, quantity });
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при добавлении товара в корзину' });
  }
});


export default router