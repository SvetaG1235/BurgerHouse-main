import Dish from '../models/DishModel.js'; 

class DishService {
    static async getAllDishes() {
        try {
            const dishes = await Dish.findAll();
            return dishes;
        } catch (error) {
            throw new Error('Ошибка при получении блюд: ' + error.message);
        }
    }

    static async addDish(dishData) {
        try {
            const newDish = await Dish.create(dishData);
            return newDish;
        } catch (error) {
            throw new Error('Ошибка при добавлении блюда: ' + error.message);
        }
    }

    static async deleteDish(id) {
        try {
            const dish = await Dish.findByPk(id);
            if (!dish) {
                throw new Error('Блюдо не найдено');
            }
            await dish.destroy();
        } catch (error) {
            throw new Error('Ошибка при удалении блюда: ' + error.message);
        }
    }

    static async updateDish(id, dishData) {
        try {
            const dish = await Dish.findByPk(id);
            if (!dish) {
                throw new Error('Блюдо не найдено');
            }
            const updatedDish = await dish.update(dishData);
            return updatedDish;
        } catch (error) {
            throw new Error('Ошибка при обновлении блюда: ' + error.message);
        }
    }
}

export default DishService;