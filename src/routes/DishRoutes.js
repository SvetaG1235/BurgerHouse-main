import express from 'express';
import DishController from '../controllers/DishController.js';

const router = express.Router();

router.get('/', DishController.getAllDishes);
router.post('/', DishController.addDish);
router.delete('/:id', DishController.deleteDish);
router.put('/:id', DishController.updateDish);

export default router;