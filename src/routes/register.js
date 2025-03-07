import express from 'express';
import UserService from '../services/UserService.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Отображение страницы регистрации
router.get('/register', (req, res) => {
    res.render('register.hbs', { title: 'Регистрация' });
});

// Отображение страницы входа
router.get('/enter', (req, res) => {
    res.render('enter.hbs', { title: 'Вход' });
});

// Отображение страницы "Web App BH entered"
router.get('/web-app-bh-entered', (req, res) => {
    res.render('Web App BH entered.hbs', { title: 'Web App BH' });
});

// Обработка регистрации пользователя
router.post('/register', async (req, res) => {
    try {
        const { name, phone, email, username, password, confirmPassword, age, role } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Пароли не совпадают' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser  = await UserService.addUser ({
            name,
            phone,
            email,
            username,
            password: hashedPassword,
            age,
            role
        });

        res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: newUser  });
    } catch (error) {
        console.error('Ошибка при регистрации пользователя:', error);
        res.status(500).json({ error: 'Ошибка при регистрации пользователя' });
    }
});

// Обработка входа пользователя
router.post('/enter', async (req, res) => {
    const { username, password } = req.body; 
    try {
        const user = await UserService.getElementsByName(username);

        if (!user || user.length === 0) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        const userData = user[0];

        if (!userData.password) {
            return res.status(500).json({ message: 'Ошибка сервера: отсутствует хэш пароля' });
        }

        const isMatch = await bcrypt.compare(password, userData.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Неверный пароль' });
        }

        // Перенаправление на страницу "Web App BH entered"
        console.log('Пользователь успешно вошел, перенаправление на Web App BH entered');
        res.redirect('/web-app-bh-entered'); 
    } catch (error) {
        console.error('Ошибка при входе:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

export default router;
