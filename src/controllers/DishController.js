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
            res.status(500).json({ error: e.message });
        }
    }
}

export default DishController;