import express from 'express';
import cartController from '../controllers/CartController.js';

const router = express.Router();

router.post('/add', cartController.addToCart);
router.get('/', cartController.showCart);
router.post('/update', cartController.updateQuantity);
router.post('/remove', cartController.removeItem);

export default router;