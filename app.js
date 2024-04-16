import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import './db.js';
import { blogRouter } from './routes/blogRouter.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { userRouter } from './routes/userRouter.js';
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));
app.use('/blog', blogRouter);
app.use('/user', userRouter);
app.use('*', (req, res) => res.sendStatus(404));

app.use(errorHandler);
export default app;
