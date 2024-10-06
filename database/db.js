import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@web83.legro.mongodb.net/?retryWrites=true&w=majority&appName=web83`;


const connectDB = async () => {
    try {
        await mongoose.connect(URL)
        console.log('connect database thanh cong');
        
    } catch (error) {
        console.log(error);
    }
}

export default connectDB