import express from "express";
import userRoute from "./userRoute.js";
import doctorRoute from "./doctorRoute.js";

const webRouter = express.Router();

webRouter.use("/user", userRoute)
webRouter.use("/doctor", doctorRoute)

export default webRouter;