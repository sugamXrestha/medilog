import express from "express";
import userRoute from "./userRoute.js";
import loginRoute from "./loginRoute.js"

const webRouter = express.Router();

webRouter.use("/user", userRoute)
webRouter.use('/', loginRoute)

export default webRouter;