import mongoose from 'mongoose';

try {
    const client = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log(`Connected to MongoDB @ ${client.connection.host}`);
} catch (error) {
    console.log(error.stack);
    process.exit(1);
}
