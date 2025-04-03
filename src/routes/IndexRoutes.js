import express from 'express';
import DishController from '../controllers/DishController.js';
const router = express.Router();

export function formatMenuData(dishes) {
    const categories = {};
    dishes.forEach(dish => {
      if (!categories[dish.dish_category]) {
        categories[dish.dish_category] = [];
      }
      categories[dish.dish_category].push(dish);
    });
    return Object.entries(categories);
  }

router.get('/', async (req, res) => {
  try {
    const dishes = await DishController.getAllDishes();
    const menuData = formatMenuData(dishes);

    // Проверяем авторизацию через сессию (без Passport)
    const isAuthenticated = !!req.session.user; // true, если пользователь в сессии
    const user = req.session.user || null;
    const cartCount = req.session.cartCount || 0;

    res.render('Web App Burger house', { 
      menuData,
      isAuthenticated, 
      user,
      cartCount
    });
  } catch (error) {
    console.error('Ошибка загрузки блюд:', error);
    res.status(500).send('Ошибка сервера');
  }
});
export default router;