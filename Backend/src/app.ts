import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction, Application } from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';
import cors from 'cors';
import connectDB from './config/dbConfig';


import indexRouter from './routes/index';
import usersRouter from './routes/usersRoutes';
import productRouter from './routes/productRoutes'


dotenv.config();
connectDB();
const app: Application = express();

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/users', usersRouter);
app.use('/api/products', productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err: HttpError, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
