import { Router } from 'express';
import {
    getEntries,
    createEntry,
    getEntry,
    updateEntry,
    deleteEntry,
} from '../controllers/blogController.js';
import { protect } from '../middlewares/auth.js';

export const blogRouter = Router();

blogRouter.route('/').get(getEntries).post(protect, createEntry);
blogRouter
    .route('/:id')
    .get(getEntry)
    .put(protect, updateEntry)
    .delete(protect, deleteEntry);
