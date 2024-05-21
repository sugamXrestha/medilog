import express from 'express';
import StateController from '../controller/StateController.js';

const stateRoute = express.Router();
const stateInstance = new StateController();

stateRoute.get("/", stateInstance.index);
stateRoute.get("/:id", stateInstance.show);

export default stateRoute;