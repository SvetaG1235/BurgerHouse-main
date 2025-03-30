import express from 'express';
import DishController from '../controllers/DishController.js';

const router = express.Router();

// Рендеринг меню для неавторизованного пользователя
router.get('/', DishController.renderMenu);


export default router;