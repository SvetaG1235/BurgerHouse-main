import express from 'express';
import DishController from '../controllers/DishController.js';

const router = express.Router();

router.get('/getAllDishes', DishController.getAllDishes); 
router.post('/', DishController.addDish); 
router.post('/bulk', DishController.addAllDishes); 
router.get('/:id', DishController.getDishById); 
router.put('/:id', DishController.updateDish);
router.delete('/:id', DishController.deleteDish); 

router.get('/menu', DishController.renderMenu);
router.get('/menu/auth', DishController.renderMenuForAuthUser); 

export default router;