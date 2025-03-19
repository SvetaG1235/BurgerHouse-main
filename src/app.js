import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sequelizeDB from './db.js'; 

import indexRouter from './routes/IndexRoutes.js';
import authRouter from './routes/AuthRoutes.js';
import cartRouter from './routes/CartRoutes.js';
import dishRouter from './routes/DishRoutes.js';

const app = express();
const __dirname = path.resolve();

app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser()); 

// Настройка статической папки для всей папки public
app.use(express.static(path.join(__dirname, 'src/public'))); 

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

app.get('/web-app-bh-entered', (req, res) => {
    res.render('web-app-bh-entered.hbs', { title: 'Добро пожаловать' });
});

app.use('/', indexRouter); 
app.use('/auth', authRouter); 
app.use('/cart', cartRouter); 
app.use('/dishes', dishRouter); 

const syncDatabase = async () => {
    try {
        await sequelizeDB.sync(); 
        console.log('База данных успешно синхронизирована');
    } catch (e) {
        console.error('Ошибка синхронизации базы данных:', e);
    }
};

syncDatabase();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Что-то пошло не так!');
});

export default app;