import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userCode: { 
        type: String,
        required: true, 
        unique: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true
    },
    role:{
        type: String,
        enum: ["admin", "doctor", "patient"],
        default: "patient"
    },
    image: {
        type: String
    },
},{
    versionKey: false
})

export default mongoose.model("User", userSchema);