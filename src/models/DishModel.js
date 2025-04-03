import sequelizeDB from "../db.js";
import {Sequelize} from "sequelize";
import app from '../app.js'
import Cart from "./CartModel.js";

const Dish = sequelizeDB.define("Dish", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },
    name: {
        type: Sequelize.STRING, 
        allowNull: false,
    },
    dish_category: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    calories: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT, 
        allowNull: false,
    },
});

export default Dish

