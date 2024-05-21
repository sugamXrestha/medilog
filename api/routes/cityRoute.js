import express from 'express';
import CityController from '../controller/CityController.js';

const cityRoute = express.Router();
const cityInstance = new CityController();

cityRoute.get("/", cityInstance.index);
cityRoute.get("/:id", cityInstance.getCityByDistrict);

export default cityRoute;