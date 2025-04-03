import { DataTypes } from 'sequelize';
import sequelizeDB from '../db.js';

const OrderItem = sequelizeDB.define('OrderItem', {
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dishId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    tableName: 'order_items'
});

export default OrderItem;