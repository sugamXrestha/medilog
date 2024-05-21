import mongoose from "mongoose";

// Define the Prescription schema
const PrescriptionSchema = new mongoose.Schema({
    prescription: { type: String, required: true },
    time: { type: String, enum: ['morning', 'noon', 'night', 'morning-night', 'morning-noon-night'], required: true },
    till: { type: String, required: true }
  });

const AddPrescriptionSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    hospitalId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HospitalDetail'
    },
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    diagnosedOn: {
        type: String,
        required: true
    },
    examinationDetail:{
        type: String,
        required: true
    },
    prescriptions: [PrescriptionSchema]

})

const AddPrescription = mongoose.model('AddPrescription', AddPrescriptionSchema);

export default AddPrescription;