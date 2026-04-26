import mongoose from 'mongoose';
import { DB_NAME } from '../../constants.ts';

const connectDB = async(): Promise<void> => {
    try {
        
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error('Database connection error:', error)
        process.exit(1)
    }
}

export default connectDB;
