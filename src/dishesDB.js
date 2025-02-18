import {Sequelize} from "sequelize";

const sequelizeDB = new Sequelize({
    dialect: "sqlite",
    storage: "dishes.db",
    define: {
        timestamps: false
    }
});

export default sequelizeDB