import DishService from '../services/DishService.js';

class DishController {
    static async getAllDishes(req, res) {
        try {
            const dishes = await DishService.getAllDishes();
            res.json(dishes);
        } catch (error) {
            res.status(500).json({ error: "Ошибка при получении блюд" });
        }
    }

    static async getDishById(req, res) {
        try {
            const dish = await DishService.getDishById(req.params.id);
            if (!dish) {
                return res.status(404).json({ error: 'Блюдо не найдено' });
            }
            res.json(dish);
        } catch (error) {
            res.status(500).json({ error: "Ошибка при получении блюда" });
        }
    }

    static async addDish(req, res) {
        try {
            const newDish = await DishService.addDish(req.body);
            res.status(201).json(newDish);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async deleteDish(req, res) {
        try {
            await DishService.deleteDish(req.params.id);
            res.status(204).send();
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async updateDish(req, res) {
        try {
            const updatedDish = await DishService.updateDish(req.params.id, req.body);
            res.json(updatedDish);
        } catch (e) {
            if (e.message === 'Блюдо не найдено') {
                res.status(404).json({ error: e.message });
            } else {
                res.status(500).json({ error: e.message });
            }
        }
    }

    static async addAllDishes(req, res) {
        try {
            console.log("Добавление всех блюд...");
            const createdDishes = await DishService.addAllDishes();
            console.log("Блюда добавлены:", createdDishes);
            res.status(201).json(createdDishes);
        } catch (error) {
            console.error('Ошибка при добавлении блюд:', error);
            res.status(500).json({ error: 'Ошибка при добавлении блюд' });
        }
        try {
            const createdDishes = await DishService.addAllDishes();
            res.status(201).json(createdDishes);
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при добавлении блюд' });
        }
    }
}

export default DishController;
