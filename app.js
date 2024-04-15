import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import './db.js';
import { blogRouter } from './routes/blogRouter.js';
import { errorHandler } from './middlewares/errorHandler.js';
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));
app.use('/blog', blogRouter);
// add router to handle registration and login

app.use('*', (req, res) => res.sendStatus(404));

app.use(errorHandler);
export default app;
