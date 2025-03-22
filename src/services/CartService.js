import Cart from '../models/CartModel.js';

class CartService {
    static async addToCart(dishId, quantity = 1) {
        try {
            const existingItem = await Cart.findOne({ where: { dishId } });
            if (existingItem) {a
                existingItem.quantity += quantity;
                await existingItem.save();
                return existingItem;
            } else {
                const newItem = await Cart.create({ dishId, quantity });
                return newItem;
            }
        } catch (error) {
            throw new Error(`Ошибка при добавлении в корзину: ${error.message}`);
        }
    }

    static async removeFromCart(dishId) {
        try {
            const item = await Cart.findOne({ where: { dishId } });
            if (!item) {
                throw new Error('Блюдо не найдено в корзине');
            }
            await item.destroy();
        } catch (error) {
            throw new Error(`Ошибка при удалении из корзины: ${error.message}`);
        }
    }

    static async updateQuantity(dishId, quantity) {
        try {
            const item = await Cart.findOne({ where: { dishId } });
            if (!item) {
                throw new Error('Блюдо не найдено в корзине');
            }
            item.quantity = quantity;
            await item.save();
            return item;
        } catch (error) {
            throw new Error(`Ошибка при обновлении количества: ${error.message}`);
        }
    }

    static async getCart() {
        try {
            return await Cart.findAll();
        } catch (error) {
            throw new Error(`Ошибка при получении корзины: ${error.message}`);
        }
    }
}

export default CartService;