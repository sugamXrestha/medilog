import express from 'express';
import DistrictController from '../controller/DistrictController.js';

const districtRoute = express.Router();
const districtInstance = new DistrictController();

districtRoute.get("/", districtInstance.index);
districtRoute.get("/:id", districtInstance.getDistrictByProvince);

export default districtRoute;