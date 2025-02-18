import sequelizeDB from "../db.js";
import {Sequelize} from "sequelize";

const CartModels = sequelizeDB.define("Cart", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    total_price: {
        type: Sequlize.INTEGER,
        allowNull: false
    }
    
})

export default CartModels