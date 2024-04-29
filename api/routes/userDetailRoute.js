import express from 'express';
import UserDetailController from '../controller/UserDetailController.js';

const userDetailRoute = express.Router();
const userDetailInstance = new UserDetailController();

userDetailRoute.get("/", userDetailInstance.index);
userDetailRoute.post("/", userDetailInstance.store)



export default userDetailRoute;