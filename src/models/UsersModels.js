import sequelizeDB from "../db.js";
import {Sequelize} from "sequelize";

const UsersModels = sequelizeDB.define("Users", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

export default UsersModels