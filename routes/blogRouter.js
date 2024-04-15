import { Router } from 'express';
import {
    getEntries,
    createEntry,
    getEntry,
} from '../controllers/blogController.js';

export const blogRouter = Router();

blogRouter.route('/').get(getEntries).post(createEntry);
blogRouter.route('/:id').get(getEntry);
