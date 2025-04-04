import Cart from '../models/CartModel.js';
import Dish from '../models/DishModel.js';

class CartService {
    static async addToCart(dishId, quantity = 1) {
        try {
            const existingItem = await Cart.findOne({ where: { dishId } });
            
            if (existingItem) {
                existingItem.quantity += quantity;
                await existingItem.save();
                return existingItem;
            }
            
            const newItem = await Cart.create({ dishId, quantity });
            return newItem;
        } catch (error) {
            console.error('Ошибка в CartService:', error);
            throw error;
        }
    }

    static async getFullCartData() {
        try {
            const cartItems = await Cart.findAll();
            const dishIds = cartItems.map(item => item.dishId);
            
            const dishes = await Dish.findAll({
                where: { id: dishIds }
            });
    
            return cartItems.map(item => {
                const dish = dishes.find(d => d.id === item.dishId);
                return {
                    id: item.id,
                    dishId: item.dishId,
                    name: dish.name,
                    price: dish.price,
                    quantity: item.quantity,
                    total: dish.price * item.quantity
                };
            });
        } catch (error) {
            console.error('Ошибка получения данных корзины:', error);
            throw error;
        }
    }

    static async removeFromCart(dishId) {
        const result = await Cart.destroy({ where: { dishId } });
        if (!result) throw new Error('Блюдо не найдено в корзине');
        return result;
    }

    static async getTotalPrice(cartData) {
        return cartData.reduce((sum, item) => sum + item.total, 0);
    }

    static async getCartCount() {
        const cartItems = await Cart.findAll();
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }
}

export default CartService;