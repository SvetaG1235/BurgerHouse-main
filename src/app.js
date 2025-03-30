import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import sequelizeDB from './db.js'; 

import indexRouter from './routes/IndexRoutes.js';
import authRouter from './routes/AuthRoutes.js';
import cartRouter from './routes/CartRoutes.js';
import dishRouter from './routes/DishRoutes.js';

const app = express();
const __dirname = path.resolve();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Настройка сессии
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));


app.use((req, res, next) => {
    res.locals.isAuthenticated = !!req.session.user;
    res.locals.currentUser = req.session.user;
    next();
});

app.use(express.static(path.join(__dirname, 'src/public')));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

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

app.use((req, res, next) => {
    res.status(404).render('404', {
        title: 'Страница не найдена'
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        title: 'Ошибка сервера',
        message: err.message
    });
});

export default app;