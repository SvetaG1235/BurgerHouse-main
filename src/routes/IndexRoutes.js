import express from 'express';
import DishController from '../controllers/DishController.js';

const router = express.Router();

// Рендеринг меню для неавторизованного пользователя
router.get('/', DishController.renderMenu);

// Рендеринг меню для авторизованного пользователя
router.get('/web-app-bh-entered', DishController.renderMenuForAuthUser);

export default router;