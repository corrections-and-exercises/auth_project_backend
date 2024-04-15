import Blog from '../models/blogModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const createEntry = asyncHandler(async (req, res, next) => {
    // add userId as author-property
    const { body } = req;
    const newEntry = await Blog.create({ ...body });
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
    } else {
        data = await Blog.find();
    }
    res.json(data);
});

export const getEntry = asyncHandler(async (req, res, next) => {
    const {
        params: { id },
    } = req;
    const entry = await Blog.findById(id);
    if (!entry)
        throw new ErrorResponse(`Entry with id of ${id} dowsn‘t exist`, 404);
    res.send(entry);
});

export const updateEntry = asyncHandler(async (req, res, next) => {
    // add userId
    const {
        body,
        params: { id },
    } = req;
    const found = await Blog.findById(id);
    if (!found)
        throw new ErrorResponse(`Entry with id of ${id} doesn‘t exist`, 404);
    // add check if user is allowed to change this entry. Users should only be able to delete their own entry.
    const updatedEntry = await Blog.findOneAndUpdate({ _id: id }, body, {
        new: true,
    });
    res.json(updatedPost);
});

export const deleteEntry = asyncHandler(async (req, res, next) => {
    // add userId
    const {
        params: { id },
    } = req;
    const found = await Blog.findById(id);
    if (!found)
        throw new ErrorResponse(`Entry with id of ${id} doesn‘t exist`, 404);
    await Blog.deleteOne({ _id: id });
    // check if user is allowed to delete this entry. Users should only be able to delete their own entries.
    res.json({ success: `Post with id of ${id} was deleted.` });
});
