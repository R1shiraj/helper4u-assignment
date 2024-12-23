//Establishing MongoDB Database connection

import mongoose from 'mongoose';

const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
};

export default connectDB;