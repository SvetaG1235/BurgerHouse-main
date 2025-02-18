import DishModel from "../models/DishModel.js";

class DishService {
    constructor() {
        this.dishModel = DishModel;
    }

    async getAllDishes() {
        try {
            return await this.dishModel.findAll();
        } catch (e) {
            console.error('Ошибка при получении блюд:', e);
            throw e;
        }
    }

    async addDish(dishData) {
        try {
            return await this.dishModel.create(dishData);
        } catch (e) {
            console.error('Ошибка при добавлении блюда:', e);
            throw e;
        }
    }

    async deleteDish(id) {
        try {
            return await this.dishModel.destroy({ where: { id } });
        } catch (e) {
            console.error('Ошибка при удалении блюда:', e);
            throw e;
        }
    }

    async updateDish(id, dishData) {
        try {
            return await this.dishModel.update(dishData, { where: { id } });
        } catch (e) {
            console.error('Ошибка при обновлении блюда:', e);
            throw e;
        }
    }
}

const dishService = new DishService();
export default dishService;