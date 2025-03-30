import sequelizeDB from "../db.js";
import {Sequelize} from "sequelize";
import { DataTypes } from "sequelize";
import app from '../app.js'
import Cart from "./CartModel.js";

const Dish = sequelizeDB.define("Dish", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },
    name: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    dish_category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    calories: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT, 
        allowNull: false,
    },
});

Dish.hasMany(Cart, {
    foreignKey: 'dishId',
    as: 'Carts'
});

export default Dish

