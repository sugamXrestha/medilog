import express from "express";
import HospitalDetailController from "../controller/HospitalDetailController.js";

const hospitalRoute = new express.Router();
const hospitalInstance = new HospitalDetailController();

hospitalRoute.get("/", hospitalInstance.index)
hospitalRoute.get("/:id", hospitalInstance.show)
hospitalRoute.post("/", hospitalInstance.store)

export default hospitalRoute