import mongoose from "mongoose";

const UserDetailSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userCode: { 
        type: Number,
        // required: true, 
        unique: true,
    },
    phone: { 
        type: String, 
        // required: true 
    },
    fullName:{
        type: String,
        required: true
    },
    dobAD:{
        type: Date,
        required: true
    },
    gender:{
        type: String,
        enum: ["Male", "Female"],
        required: true
    },
    phone:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    email:{
        type: String,
        required: true
    },
    marital:{
        type: String,
        enum: ["Single", "Married"],
        required: true
    },
    occupation:{
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    motherName:{
        type: String,
        required: true
    },
    husbandWifeName:{
        type: String
    },
    sonDaughterName:{
        type: String
    },
    perProvince:{
        type: String,
        required: true
    },
    perDistrict:{
        type: String,
        required: true
    },
    perMunicipality:{
        type: String,
        required: true
    },
    perWard:{
        type: Number,
        required: true
    },
    perTole:{
        type: String,
        required: true
    },
    tempProvince:{
        type: String,
        required: true
    },
    tempDistrict:{
        type: String,
        required: true
    },
    tempMunicipality:{
        type: String,
        required: true
    },
    tempWard:{
        type: Number,
        required: true
    },
    tempTole:{
        type: String,
        required: true
    }
})

const UserDetail = mongoose.model('UserDetail', UserDetailSchema);
export default UserDetail;