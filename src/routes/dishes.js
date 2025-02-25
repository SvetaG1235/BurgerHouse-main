import express from 'express';
import DishService from '../services/DishService.js';

const router = express.Router();

// Получение всех блюд
app.get("/dishes", async (req, res) => {
    try {
        const dishes = await Dish.findAll(); // Получаем все блюда из базы
        res.json(dishes); // Отправляем их клиенту
    } catch (error) {
        res.status(500).json({ error: "Ошибка при получении блюд" });
    }
});

// Добавление 
router.post('/', async (req, res) => {
    try {
        const newDish = await DishService.addDish(req.body);
        res.status(201).json(newDish);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Удаление
router.delete('/:id', async (req, res) => {
    try {
        await DishService.deleteDish(req.params.id);
        res.status(204).send();
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Обновление 
router.put('/:id', async (req, res) => {
    try {
        const updatedDish = await DishService.updateDish(req.params.id, req.body);
        res.json(updatedDish);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

export default router;
