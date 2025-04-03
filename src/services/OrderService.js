import Order from '../models/OrderModel.js';
import OrderItem from '../models/OrderItemModel.js';
import sequelizeDB from '../db.js';

class OrderService {
    // Создание нового заказа
    static async createOrder(orderData) {
        const transaction = await sequelizeDB.transaction();

        try {
            // 1. Создаем запись заказа
            const order = await Order.create({
                userId: orderData.userId,
                address: orderData.address,
                phone: orderData.phone,
                paymentMethod: orderData.paymentMethod,
                total: orderData.total,
                notes: orderData.notes,
                status: 'processing'
            }, { transaction });

            // 2. Добавляем товары заказа
            for (const item of orderData.items) {
                await OrderItem.create({
                    orderId: order.id,
                    dishId: item.dishId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                }, { transaction });
            }

            await transaction.commit();
            return order;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    // Получение заказа по ID
    static async getOrderById(orderId) {
        const order = await Order.findByPk(orderId);
        if (!order) return null;

        const items = await OrderItem.findAll({ where: { orderId } });
        return {
            ...order.toJSON(),
            items
        };
    }

    // Получение заказов пользователя
    static async getUserOrders(userId) {
        const orders = await Order.findAll({ 
            where: { userId },
            order: [['createdAt', 'DESC']]
        });

        return Promise.all(
            orders.map(async order => {
                const items = await OrderItem.findAll({ 
                    where: { orderId: order.id }
                });
                return {
                    ...order.toJSON(),
                    items
                };
            })
        );
    }

    // Обновление статуса заказа (для администратора)
    static async updateOrderStatus(orderId, status) {
        const allowedStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];
        if (!allowedStatuses.includes(status)) {
            throw new Error('Недопустимый статус заказа');
        }

        const order = await Order.findByPk(orderId);
        if (!order) {
            throw new Error('Заказ не найден');
        }

        order.status = status;
        await order.save();
        return order;
    }
}

export default OrderService;