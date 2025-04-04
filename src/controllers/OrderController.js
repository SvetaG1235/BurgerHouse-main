import OrderService from '../services/OrderService.js';
import CartService from '../services/CartService.js';

class OrderController {
    // Страница оформления заказа
    async showCheckoutPage(req, res) {
        try {
            if (!req.session.user) {
                return res.redirect('/auth/login');
            }

            const cartItems = await CartService.getFullCartData();
            const totalPrice = await CartService.getTotalPrice(cartItems);

            if (cartItems.length === 0) {
                return res.redirect('/cart?error=Корзина пуста');
            }

            res.render('order', {
                cartItems,
                totalPrice,
                user: req.session.user,
                error: req.query.error || null // Передаем ошибку, если есть
            });
        } catch (error) {
            console.error('Ошибка при загрузке страницы оформления заказа:', error);
            res.redirect(`/cart?error=${encodeURIComponent(error.message)}`);
        }
    }

    // Создание заказа
    async createOrder(req, res) {
        try {
            if (!req.session.user) {
                return res.redirect('/auth/login');
            }

            const { address, phone, paymentMethod, notes } = req.body;
            
            if (!address || !phone || !paymentMethod) {
                throw new Error('Все обязательные поля должны быть заполнены');
            }

            const cartItems = await CartService.getFullCartData();
            const totalPrice = await CartService.getTotalPrice(cartItems);

            if (cartItems.length === 0) {
                throw new Error('Корзина пуста');
            }

            const orderData = {
                userId: req.session.user.id,
                address,
                phone,
                paymentMethod,
                total: totalPrice,
                notes: notes || null,
                items: cartItems
            };

            await OrderService.createOrder(orderData);
            await CartService.clearCart(req.session.user.id);

            res.redirect('/order/success');
        } catch (error) {
            console.error('Ошибка при создании заказа:', error);
            res.redirect(`/order/checkout?error=${encodeURIComponent(error.message)}`);
        }
    }

    // История заказов
    async getOrderHistory(req, res) {
        try {
            if (!req.session.user) {
                return res.redirect('/auth/login');
            }

            const orders = await OrderService.getUserOrders(req.session.user.id);
            res.render('order-history', { orders });
        } catch (error) {
            console.error('Ошибка при загрузке истории заказов:', error);
            res.render('order-history', { 
                orders: [],
                error: 'Не удалось загрузить историю заказов'
            });
        }
    }

    // Детали заказа
    async getOrderDetails(req, res) {
        try {
            if (!req.session.user) {
                return res.redirect('/auth/login');
            }

            const order = await OrderService.getOrderById(req.params.id);
            
            if (!order || order.userId !== req.session.user.id) {
                return res.status(404).render('404');
            }

            res.render('order-details', { order });
        } catch (error) {
            console.error('Ошибка при загрузке заказа:', error);
            res.status( 500).render('error', { 
                message: 'Ошибка при загрузке заказа'
            });
        }
    }
}

export default new OrderController();