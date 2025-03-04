import express from 'express';
import UserService from '../services/UserService.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register.hbs', { title: 'Регистрация' });
});


router.get('/enter', (req, res) => {
    res.render('enter.hbs', { title: 'Вход' });
});

router.post('/register', async (req, res) => {
    try {
        const { name, phone, email, username, password, confirmPassword, age, role } = req.body;


        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Пароли не совпадают' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserService.addUser({
            name,
            phone,
            email,
            username,
            password: hashedPassword,
            age,
            role
        });

        res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: newUser });
    } catch (error) {
        console.error('Ошибка при регистрации пользователя:', error);
        res.status(500).json({ error: 'Ошибка при регистрации пользователя' });
    }
});


router.post('/enter', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
        }

        const user = await UserService.findUserByUsername(username);

        if (!user) {
            return res.status(401).json({ error: 'Неверный логин или пароль' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Неверный логин или пароль' });
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
        res.status(500).json({ error: 'Ошибка при входе' });
    }
});

export default router;