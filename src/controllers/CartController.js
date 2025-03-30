import CartService from '../services/CartService.js';

class CartController {
    static async addToCart(req, res) {
        try {
            const { dishId, quantity } = req.body;
            const item = await CartService.addToCart(dishId, quantity);
            res.status(201).json(item);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async removeFromCart(req, res) {
        try {
            const { dishId } = req.params;
            await CartService.removeFromCart(dishId);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async updateQuantity(req, res) {
        try {
            const { dishId } = req.params;
            const { quantity } = req.body;
            const item = await CartService.updateQuantity(dishId, quantity);
            res.status(200).json(item);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getCart(req, res) {
        try {
            const cart = await CartService.getCart();
            const totalPrice = await CartService.getTotalPrice();

            res.render('cart', { 
                cartItems: cart, 
                totalPrice: totalPrice 
            });
        } catch (error) {
            console.error('Ошибка при рендеринге корзины:', error); 
            res.status(500).render('error', { error: error.message });
        }
    }
}

export default CartController;
