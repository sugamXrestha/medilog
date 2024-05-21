import express from "express";
import userRoute from "./userRoute.js";
import loginRoute from "./loginRoute.js"
import userDetailRoute from "./userDetailRoute.js";
import cityRoute from "./cityRoute.js";
import districtRoute from "./districtRoute.js";
import stateRoute from "./stateRoute.js";
import prescriptionRoute from "./prescriptionRoute.js";
import hospitalRoute from "./hospitalDetailRoute.js";

const webRouter = express.Router();

webRouter.use('/', loginRoute)
webRouter.use("/user", userRoute)
webRouter.use("/user-detail", userDetailRoute)
webRouter.use("/hospital-detail", hospitalRoute)
webRouter.use("/prescription", prescriptionRoute)
webRouter.use("/city", cityRoute)
webRouter.use("/district", districtRoute)
webRouter.use("/state", stateRoute)

export default webRouter;