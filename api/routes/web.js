import express from "express";
import userRoute from "./userRoute.js";
import loginRoute from "./loginRoute.js"
import userDetailRoute from "./userDetailRoute.js";

const webRouter = express.Router();

webRouter.use('/', loginRoute)
webRouter.use("/user", userRoute)
webRouter.use("/user-detail", userDetailRoute)

export default webRouter;