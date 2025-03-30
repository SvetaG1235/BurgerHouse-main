class OrderController {
    async createOrder(req, res) {
        try {
            const { 
                address, 
                phone, 
                paymentMethod, 
                cashAmount,
                notes 
            } = req.body;
            
            const totalPrice = await CartService.getTotalPrice();
            const cartItems = await CartService.getFullCartData();
            
            const orderData = {
                userId: req.user.id,
                address,
                phone,
                paymentMethod,
                total: totalPrice,
                notes,
                items: cartItems
            };
            
            if (paymentMethod === 'cash') {
                orderData.cashAmount = cashAmount;
                orderData.change = cashAmount - totalPrice;
            }
            
            const order = await OrderService.createOrder(orderData);
            await CartService.clearCart();
            
            res.redirect('/orders/success');
        } catch (error) {
            res.redirect('/cart?error=' + encodeURIComponent(error.message));
        }
    }
}

export default new OrderController();