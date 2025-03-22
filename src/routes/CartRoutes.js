import express from 'express';
import CartController from '../controllers/CartController.js';

const router = express.Router();

router.post('/', CartController.addToCart);
router.delete('/:dishId', CartController.removeFromCart);
router.put('/:dishId', CartController.updateQuantity);
router.get('/', CartController.getCart);

export default router;