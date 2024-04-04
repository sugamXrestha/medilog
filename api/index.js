import express  from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import webRouter from "./routes/web.js";
import dbConnection from "./database/connection.js";
dotenv.config();

dbConnection();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))

app.use("/", webRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log(`Server is listening in ${PORT}`)
})
        