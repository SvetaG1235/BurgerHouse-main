import CartService from '../services/CartService.js';

class CartController {
    async addToCart(req, res) {
        try {
            const { dishId } = req.body;
            await CartService.addToCart(dishId, 1);
            
            // Возвращаем JSON с обновленными данными
            const cartCount = await CartService.getCartCount();
            res.json({
                success: true,
                cartCount: cartCount,
                dishId: dishId
            });
        } catch (error) {
            res.status(400).json({ 
                error: error.message 
            });
        }
    }
    async showCart(req, res) {
        try {
            const cartData = await CartService.getFullCartData();
            const totalPrice = cartData.reduce((sum, item) => sum + item.total, 0);
            
            res.render('cart', {
                cartItems: cartData,
                totalPrice: totalPrice,
                error: req.query.error
            });
        } catch (error) {
            console.error('Error showing cart:', error);
            res.render('cart', {
                cartItems: [],
                totalPrice: 0,
                error: 'Ошибка загрузки корзины'
            });
        }
    }

    async removeItem(req, res) {
        try {
            const { dishId } = req.body;
            await CartService.removeFromCart(dishId);
            res.redirect('/cart');
        } catch (error) {
            console.error('Ошибка удаления:', error);
            res.redirect(`/cart?error=${encodeURIComponent(error.message)}`);
        }
    }

    async updateQuantity(req, res) {
        try {
            const { dishId, action } = req.body;
            const item = await Cart.findOne({ where: { dishId } });
            
            if (!item) throw new Error('Товар не найден в корзине');
            
            if (action === 'increase') {
                item.quantity += 1;
            } else if (action === 'decrease') {
                item.quantity = Math.max(item.quantity - 1, 1);
            }
            
            await item.save();
            
            // Возвращаем обновленные данные
            const cartCount = await CartService.getCartCount();
            res.json({
                success: true,
                newQuantity: item.quantity,
                cartCount: cartCount
            });
        } catch (error) {
            res.status(400).json({ 
                error: error.message 
            });
        }
    }
}

export default new CartController();