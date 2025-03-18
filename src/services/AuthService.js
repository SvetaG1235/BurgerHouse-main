import bcrypt from 'bcrypt';
import UsersModels from '../models/UsersModels.js';

class AuthService {
    /**
     * Хеширование пароля.
     */
    static async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }

 
    static async comparePasswords(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }

    static async findUserByUsername(username) {
        try {
            return await UsersModels.findOne({ where: { username } });
        } catch (error) {
            console.error('Ошибка при поиске пользователя:', error);
            throw new Error('Не удалось найти пользователя');
        }
    }

    static async register(userData) {
        try {
            return await UsersModels.create(userData);
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error);
            throw new Error('Не удалось создать пользователя');
        }
    }
}

export default AuthService;
