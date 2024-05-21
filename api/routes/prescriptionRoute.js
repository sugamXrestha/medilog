import express from 'express';
import PrescriptionDetailController from '../controller/PrescriptionDetailController.js';

const prescriptionRoute = express.Router();
const prescriptionInstance = new PrescriptionDetailController();

prescriptionRoute.get("/", prescriptionInstance.index);
prescriptionRoute.get("/:id", prescriptionInstance.show);
prescriptionRoute.post("/", prescriptionInstance.store)


export default prescriptionRoute;