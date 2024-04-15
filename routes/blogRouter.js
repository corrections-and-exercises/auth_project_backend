import { Router } from 'express';
import {
    getEntries,
    createEntry,
    getEntry,
    updateEntry,
    deleteEntry,
} from '../controllers/blogController.js';

export const blogRouter = Router();
//protect relevant paths
blogRouter.route('/').get(getEntries).post(createEntry);
blogRouter.route('/:id').get(getEntry).put(updateEntry).delete(deleteEntry);
