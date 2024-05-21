import express from 'express';
import UserController from '../controller/UserController.js';
import UploadMiddleware from '../middleware/UploadMiddleware.js'

const userRoute = express.Router();
const userInstance = new UserController();
const uploadInstance = new UploadMiddleware();
const upI = uploadInstance.upload("users");

userRoute.get("/", userInstance.index);
userRoute.get("/profile",userInstance.getProfile);
userRoute.get("/:id", userInstance.show);
// userRoute.post("/", userInstance.storeOrUpdate);
userRoute.post("/", userInstance.store);
userRoute.put("/:id",upI.single("image"), userInstance.update);
userRoute.delete("/:id", userInstance.destroy);

export default userRoute