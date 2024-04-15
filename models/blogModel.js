import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const blogSchema = new Schema({
    title: { type: String, required: [true, 'Title is required'] },
    image: { type: String, required: [true, 'Image is required'] },
    body: { type: String, required: [true, 'Body is required'] },
    date: { type: Date, default: Date.now },
});

export default model('Blog', blogSchema);
