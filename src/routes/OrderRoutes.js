import express from 'express';
import OrderController from '../controllers/OrderController.js';

const router = express.Router();

router.get('/checkout', OrderController.showCheckoutPage);

router.post('/create', OrderController.createOrder);

router.get('/history', OrderController.getOrderHistory);

router.get('/:id', OrderController.getOrderDetails);

export default router;