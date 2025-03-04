import express from 'express';
import UserService from '../services/UserService';
const router = express.Router();


router.get('/register', function(req, res, next) {
  res.render('register.hbs', { title: 'Express' });
});
router.get('/enter', function(req, res, next) {
    res.render('enter.hbs', { title: 'Express' });
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
export default router
