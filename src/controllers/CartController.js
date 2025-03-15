import CartService from '../services/CartService.js';

class CartController {
    static renderCartPage(req, res) {
        res.render('cart.hbs', { title: 'Корзина' });
    }

    static async addToCart(req, res) {
        try {
            const { productId, quantity } = req.body;
            const userId = req.user.id; // Предполагаем, что пользователь авторизован
            const cartItem = await CartService.addToCart(userId, productId, quantity);
            res.json(cartItem);
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при добавлении товара в корзину' });
        }
    }
}

export default CartController;