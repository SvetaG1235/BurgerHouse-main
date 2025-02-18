import sequelizeDB from "../dishesDB.js";
import {Sequelize} from "sequelize";

const DishesModels = sequelizeDB.define("Dishes", {
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

export default DishesModels