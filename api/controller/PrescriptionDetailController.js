import AddPrescription from "../models/PrescriptionDetails.js";
import mongoose from "mongoose";

class PrescriptionDetailController {
  async index(req, res) {
    try {
      const data = await AddPrescription.find()
      .populate({
        path: "patientId",
        
      })
      .populate({
        path: "hospitalId",
        
      })
      .populate({
        path: "doctorId",
       
      })
      
      
      res.status(200).json({ status: true, records: data });
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ error: error.message });
    }
  }
  async show(req, res) {
    try{
      const id = req.params.id;
      const data = await AddPrescription.find({patientId: id})
      .populate({
        path: "patientId",
      })
      .populate({
        path: "hospitalId",
        populate: {
          path: "city",
          populate: {
            path: "district",
            populate: {
              path: "state"
            }
          }
        }
        
      })
      .populate({
        path: "doctorId",
       
      });
      res.status(200).json({ status: true,data });
    } catch (error) {
      console.error("Error fetching Specific record details:", error);
      res.status(500).json({ error: error.message });
    }
  }
  async store(req, res) {
    console.log(req.body)
    try {
      const prescriptionData = new AddPrescription({ ...req.body });
      const savedprescriptionData = await prescriptionData.save();
      res.status(200).json({ message: "Prescription data inserted" });
    } catch (err) {
      console.error("Error saving Prescription data:", err);
      res.status(500).json({ error: err.message });
    }
  }
}

export default PrescriptionDetailController;
