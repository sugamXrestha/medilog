import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();


const dbConnection = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to the Database");
    }catch(error){
        console.log("Error connecting to the Database: ", error);
    }
}

export default dbConnection