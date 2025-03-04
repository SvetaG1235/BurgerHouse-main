import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan'
import sequelizeDB from "./db.js";
import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'
import registerRouter from './routes/register.js'
import cartRouter from './routes/cart.js'
import dishesRouter from './routes/dishes.js'
import UsersModels from './models/UsersModels.js';
import UserService from './services/UserService.js';

import bcrypt from 'bcrypt';

export const app = express();
const __dirname = path.resolve()
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src/public/stylesheets')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', registerRouter);
app.use('/cart', cartRouter);
app.use('/dishes', dishesRouter);



try{
    sequelizeDB.sync()
}catch (e) {
    console.log('Упс! База не живая:(')
}

app.post('/register', async (req, res) => {
    const { name, phone, email, username, password, confirmPassword, age, role } = req.body;

    // Проверка на совпадение паролей
    if (password !== confirmPassword) {
        return res.status(400).send('Пароли не совпадают');
    }

    try {
        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 10); 

        // Создание нового пользователя
        const newUser   = await UsersModels.create({
            name,
            phone, 
            email, 
            username,
            password: hashedPassword, 
            role: role, 
            age: age 
        });

        res.status(201).send(`
            <h1>Пользователь успешно зарегистрирован</h1>
            <p><a href="auth/enter">Перейти на страницу входа</a></p>
        `);
    } catch (error) {
        console.error('Ошибка при регистрации пользователя:', error);
        res.status(500).send('Ошибка сервера');
    }
});
export default app

//npm install express sqlite3 bcrypt jsonwebtoken dotenv
