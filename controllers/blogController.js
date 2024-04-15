import Blog from '../models/blogModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const createEntry = asyncHandler(async (req, res, next) => {
    const { body, userId } = req;
    const newEntry = await Blog.create({ ...body, author: userId });
    // populate with author data
    res.status(201).json(newEntry);
});

export const getEntries = asyncHandler(async (req, res, next) => {
    let data;
    const {
        query: { author },
    } = req;
    if (author) {
        data = await Blog.find({
            author: author,
        });
        // populate with author data
    } else {
        data = await Blog.find().populate('author');
    }
    res.json(data);
});

export const getEntry = asyncHandler(async (req, res, next) => {
    const {
        params: { id },
    } = req;
    const entry = await Blog.findById(id);
    // populate with author data
    if (!entry)
        throw new ErrorResponse(`Entry with id of ${id} dowsn‘t exist`, 404);
    res.send(entry);
});

export const updateEntry = asyncHandler(async (req, res, next) => {
    const {
        body,
        params: { id },
        userId,
    } = req;
    const found = await Blog.findById(id);
    if (!found)
        throw new ErrorResponse(`Entry with id of ${id} doesn‘t exist`, 404);
    // add check if user is allowed to update the article

    const updatedEntry = await Blog.findOneAndUpdate({ _id: id }, body, {
        new: true,
    });
    res.json(updatedEntry);
});

export const deleteEntry = asyncHandler(async (req, res, next) => {
    const {
        params: { id },
        userId,
    } = req;
    const found = await Blog.findById(id);
    if (!found)
        throw new ErrorResponse(`Entry with id of ${id} doesn‘t exist`, 404);
    // add check if user is allowed to delete this article

    await Blog.deleteOne({ _id: id });
    res.json({ success: `Post with id of ${id} was deleted.` });
});
