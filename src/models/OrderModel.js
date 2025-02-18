import sequelizeDB from "../orderDB.js";
import {Sequelize} from "sequelize";

const OrderModels = sequelizeDB.define("Order", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    dish_category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    calories: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequlize.INTEGER,
        allowNull: false
    }
    
})

export default OrderModels