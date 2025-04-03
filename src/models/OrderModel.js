import { DataTypes } from 'sequelize';
import sequelizeDB from '../db.js';

const Order = sequelizeDB.define('Order', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paymentMethod: {
        type: DataTypes.ENUM('card', 'cash'),
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.ENUM(
            'processing',
            'shipped',
            'delivered',
            'cancelled'
        ),
        defaultValue: 'processing'
    }
}, {
    tableName: 'orders',
    timestamps: true
});

export default Order;