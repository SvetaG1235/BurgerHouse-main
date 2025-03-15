import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sequelizeDB from './db.js'; 

import indexRouter from './routes/IndexRoutes.js';
import authRouter from './routes/AuthRoutes.js';
import cartRouter from './routes/CartRoutes.js';
import dishRouter from './routes/DishRoutes.js';
//import adminRouter from './routes/AdminRouter.js';

const app = express();
const __dirname = path.resolve();

app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'src/public/stylesheets'))); 

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

app.get('Web App BH entered', (req, res) => {
    res.render('Web_App_BH_entered.hbs', { title: 'Добро пожаловать' });
});

app.use('/', indexRouter); 
app.use('/auth', authRouter); 
app.use('/cart', cartRouter); 
app.use('/dishes', dishRouter); 
//app.use('/admin', adminRouter); 

try {
    sequelizeDB.sync(); 
    console.log('База данных успешно синхронизирована');
} catch (e) {
    console.error('Ошибка синхронизации базы данных:', e);
}

export default app;