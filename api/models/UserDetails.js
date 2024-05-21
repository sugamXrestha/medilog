import mongoose from "mongoose";

const UserDetailSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dobAD:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        enum: ["Male", "Female"],
        required: true
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
    perCity:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
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
    tempCity:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
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