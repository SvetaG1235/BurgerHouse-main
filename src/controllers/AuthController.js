import AuthService from '../services/AuthService.js';

class AuthController {
    static showRegistrationForm(req, res) {
        res.render('register.hbs', { title: 'Регистрация' });
    }

  
    static showLoginForm(req, res) {
        res.render('enter.hbs', { title: 'Вход' });
    }

    static async register(req, res) {
        try {
            console.log('Полученные данные:', req.body); 
    
            const { name, username, email, password, confirmPassword, phone, age, role } = req.body;
    
            if (!phone || !age) {
                return res.status(400).json({ error: 'Телефон и возраст обязательны для заполнения.' });
            }
    
            if (password !== confirmPassword) {
                return res.status(400).json({ error: 'Пароли не совпадают' });
            }
    

            const hashedPassword = await AuthService.hashPassword(password);
    
            const newUser  = await AuthService.register({
                name,
                username,
                email,
                password: hashedPassword,
                phone, 
                age,   
                role
            });
    
            res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: newUser  });
        } catch (error) {
            console.error('Ошибка при регистрации пользователя:', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body;
    
            const user = await AuthService.findUserByUsername(username);
    
            if (!user) {
                return res.status(401).json({ error: 'Пользователь не найден' });
            }

            const isPasswordValid = await AuthService.comparePasswords(password, user.password);
    
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Неверный пароль' });
            }

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
