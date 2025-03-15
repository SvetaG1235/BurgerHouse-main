import UsersModels from '../models/UsersModels.js';

class UserService {
    static async getAllUsers() {
        try {
            return await UsersModels.findAll();
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
            throw new Error('Не удалось получить пользователей');
        }
    }

 
    static async updateUser(id, userData) {
        try {
            const user = await UsersModels.findByPk(id);
            if (!user) {
                throw new Error('Пользователь не найден');
            }
            return await user.update(userData);
        } catch (error) {
            console.error('Ошибка при обновлении пользователя:', error);
            throw new Error('Не удалось обновить пользователя');
        }
    }
    static async deleteUser(id) {
        try {
            const user = await UsersModels.findByPk(id);
            if (!user) {
                throw new Error('Пользователь не найден');
            }
            await user.destroy();
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
            throw new Error('Не удалось удалить пользователя');
        }
    }
}

export default UserService;