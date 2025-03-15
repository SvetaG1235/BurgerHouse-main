import AuthService from '../services/AuthService.js';

class AuthController {
    /**
     * Показать форму регистрации.
     */
    static showRegistrationForm(req, res) {
        res.render('register.hbs', { title: 'Регистрация' });
    }

    /**
     * Показать форму входа.
     */
    static showLoginForm(req, res) {
        res.render('enter.hbs', { title: 'Вход' });
    }

    /**
     * Регистрация пользователя.
     */
    static async register(req, res) {
        try {
            const { name, username, email, password, confirmPassword, role } = req.body;

            // Проверка совпадения паролей
            if (password !== confirmPassword) {
                return res.status(400).json({ error: 'Пароли не совпадают' });
            }

            // Хеширование пароля
            const hashedPassword = await AuthService.hashPassword(password);

            // Создание пользователя
            const newUser = await AuthService.register({
                name,
                username,
                email,
                password: hashedPassword,
                role
            });

            // Возвращаем JSON с данными пользователя
            res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: newUser });
        } catch (error) {
            console.error('Ошибка при регистрации пользователя:', error);
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Вход пользователя.
     */
    static async login(req, res) {
        try {
            const { username, password } = req.body;
    
            // Поиск пользователя по имени
            const user = await AuthService.findUserByUsername(username);
    
            if (!user) {
                return res.status(401).json({ error: 'Пользователь не найден' });
            }
    
            // Проверка пароля
            const isPasswordValid = await AuthService.comparePasswords(password, user.password);
    
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Неверный пароль' });
            }
    
            // Возвращаем JSON с данными пользователя (без пароля)
            const userData = {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role
            };
    
            res.status(200).json({ message: 'Вход выполнен успешно', user: userData });
        } catch (error) {
            console.error('Ошибка при входе:', error);
            res.status(500).json({ error: error.message });
        }
    }
}
export default AuthController;
