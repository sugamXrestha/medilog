import express  from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import webRouter from "./routes/web.js";
import dbConnection from "./database/connection.js";
import UserTableSeeder from "./database/seeder/UserTableSeeder.js";
import defaultLocation from "./utils/defaultLocation.js";
// const defaultLocation = require('./utils/defaultLocation.js');
dotenv.config();

dbConnection();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))

app.use("/", webRouter);
UserTableSeeder.run();

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Optionally, exit the process to avoid undefined behavior
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Optionally, exit the process to avoid undefined behavior
    process.exit(1);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async() =>{
    console.log(`Server is listening in ${PORT}`)
    await defaultLocation();
    
})
        