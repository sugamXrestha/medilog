import express from "express";
import userRoute from "./userRoute.js";

const webRouter = express.Router();

webRouter.use("/user", userRoute)

export default webRouter;