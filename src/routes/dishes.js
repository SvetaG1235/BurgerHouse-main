import express from 'express';
import DishService from '../services/DishService.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const dishes = await DishService.getAllDishes();
        res.json(dishes);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newDish = await DishService.addDish(req.body);
        res.status(201).json(newDish);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await DishService.deleteDish(req.params.id);
        res.status(204).send();
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedDish = await DishService.updateDish(req.params.id, req.body);
        res.json(updatedDish);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

export default router;

const dishes = [
    {
        id: 1,
        name: "бургер",
        dish_category: "",
        price: 5.99,
        calories: 650,
    },
  
];

dishes.forEach(async (dishData) => {
    try {
        const dish = await DishService.addDish(dishData);
        console.log('Добавлено блюдо:', dish);
    } catch (e) {
        console.error('Ошибка при добавлении блюда:', e);
    }
});