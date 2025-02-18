import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan'
import sequelizeDB from "./db.js";
import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'
import registerRouter from './routes/register.js'
import cartRouter from './routes/cart.js'
import dishesRouter from './routes/dishes.js';

const app = express();
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


export default app
