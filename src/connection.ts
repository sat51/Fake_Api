import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGODB: string = process.env.MONGODB_URI || " ";
// console.log(MONGODB);
const connectDb = async ():Promise<void> => {
    await mongoose.connect(MONGODB)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error: Error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
});
}  


export default connectDb;



