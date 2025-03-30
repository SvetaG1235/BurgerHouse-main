import bcrypt from 'bcrypt';
import UsersModels from '../models/UsersModels.js';

class AuthService {
    // Хеширование пароля
    static async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }

    // Сравнение паролей
    static async comparePasswords(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    // Поиск пользователя по имени
    static async findUserByUsername(username) {
        return await UsersModels.findOne({ where: { username } });
    }

    // Поиск пользователя по email
    static async findUserByEmail(email) {
        return await UsersModels.findOne({ where: { email } });
    }

    // Поиск пользователя по ID
    static async findUserById(id) {
        return await UsersModels.findByPk(id);
    }

    // Регистрация пользователя
    static async registerUser(userData) {
        const hashedPassword = await this.hashPassword(userData.password);
        
        return await UsersModels.create({
            ...userData,
            password: hashedPassword
        });
    }

    // Обновление пароля
    static async updatePassword(userId, newPassword) {
        const hashedPassword = await this.hashPassword(newPassword);
        return await UsersModels.update(
            { password: hashedPassword },
            { where: { id: userId } }
        );
    }
}

export default AuthService;