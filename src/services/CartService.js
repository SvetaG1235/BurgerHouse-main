import Cart from '../models/CartModel.js';

class CartService {
    static async addToCart(userId, productId, quantity) {
        try {
            const cartItem = await Cart.create({ userId, productId, quantity });
            return cartItem;
        } catch (error) {
            throw new Error('Ошибка при добавлении товара в корзину: ' + error.message);
        }
    }
}

export default CartService;