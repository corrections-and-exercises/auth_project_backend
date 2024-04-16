import { Router } from 'express';
import { getUser, signUp, signIn } from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';

export const userRouter = Router();

userRouter.post('/signup', signUp);
userRouter.post('/signin', signIn);
userRouter.get('/me', protect, getUser);
