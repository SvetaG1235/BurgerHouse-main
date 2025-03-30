import sequelizeDB from "../db.js";
import {Sequelize} from "sequelize";

const Cart = sequelizeDB.define('Cart', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dishId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    tableName: 'Carts',
    timestamps: false // Отключаем автоматические timestamp поля
});

export default Cart;