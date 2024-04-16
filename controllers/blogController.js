import Blog from '../models/blogModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const createEntry = asyncHandler(async (req, res, next) => {
    const { body, userId } = req;
    const newEntry = await (
        await Blog.create({ ...body, author: userId })
    ).populate('author');
    res.status(201).json(newEntry);
});

export const getEntries = asyncHandler(async (req, res, next) => {
    let data;
    const {
        query: { author },
    } = req;
    console.log('author', author);
    if (author) {
        data = await Blog.find({
            author: author,
        }).populate('author');
    } else {
        data = await Blog.find().populate('author');
    }
    res.json(data);
});

export const getEntry = asyncHandler(async (req, res, next) => {
    const {
        params: { id },
    } = req;
    const entry = await Blog.findById(id).populate('author');
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
    if (userId != found.author._id.toString())
        throw new ErrorResponse(
            'You have no permisson to update this article',
            401
        );
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
    console.log('userId', userId);
    console.log('author', found.author._id);
    if (userId != found.author._id.toString())
        throw new ErrorResponse(
            'You have no permisson to delete this article',
            401
        );
    await Blog.deleteOne({ _id: id });
    res.json({ success: `Post with id of ${id} was deleted.` });
});
