import DishService from '../services/DishService.js';

class DishController {
    static async getAllDishes(req, res) {
        try {
            const dishes = await DishService.getAllDishes();
            res.status(200).json(dishes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async addDish(req, res) {
        try {
            const dish = await DishService.addDish(req.body);
            res.status(201).json(dish);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getDishById(req, res) {
        try {
            const dish = await DishService.getDishById(req.params.id);
            res.status(200).json(dish);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async updateDish(req, res) {
        try {
            const dish = await DishService.updateDish(req.params.id, req.body);
            res.status(200).json(dish);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteDish(req, res) {
        try {
            await DishService.deleteDish(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async addAllDishes(req, res) {
        try {
            const dishes = await DishService.addAllDishes();
            res.status(201).json(dishes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async renderMenu(req, res) {
        try {
            const dishes = await DishService.getAllDishes();
            console.log('Данные для шаблона:', dishes); // Логирование
            
            console.log('ок')
            
            res.render('Web App Burger house.hbs', { dishes });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
}

export default DishController;
