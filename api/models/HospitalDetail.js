import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: true,
    },
    established: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contact: {
        type: String,
        required: true,
    },
    websiteUrl: {
        type: String,
        required: true
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: true,
    },
    ward: {
        type: Number,
        required: true,
        min: 1,
    },
    tole: {
        type: String,
        required: true,
    },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }
})

const HospitalDetail = mongoose.model("HospitalDetail", hospitalSchema);
export default HospitalDetail