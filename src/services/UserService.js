import UsersModels from '../models/UsersModels.js';

class UserServices {
    users = undefined;

    constructor() {
        this.users = UsersModels;
    }

    async getAllUsers() {
        let allUsers = undefined;
        try {
            allUsers = await this.users.findAll();
        } catch (e) {
            console.log('Упс! Мы как то сломались:(');
            console.log(e);
        }
        return allUsers;
    }

    async addUser() {
        const user = {
            name: `Василий`,
            age: 45
        };
        try {
            return await this.users.create(user);
        } catch (e) {
            console.log('Упс! Мы не смогли создать пользоваля:(');
            console.log(e);
        }
    }

    async getElementsByName(name) {
        try {
           
            const users = await this.users.findAll({
                where: {
                    name: name
                }
            });
            return users; 
        } catch (e) {
            console.log('Упс! Мы не смогли найти пользователей:(');
            console.log(e);
            return []; 
        }
    }
}

export default UserService;
