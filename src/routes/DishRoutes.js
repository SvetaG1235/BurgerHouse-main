import express from 'express';
import DishController from '../controllers/DishController.js';

const router = express.Router();

router.get('/', DishController.getAllDishes);
router.post('/', DishController.addDish);
router.get('/bulk', DishController.addAllDishes); 
router.get('/:id', DishController.getDishById);
router.put('/:id', DishController.updateDish);
router.delete('/:id', DishController.deleteDish);
router.post('/bulk', DishController.addAllDishes); 

export default router;