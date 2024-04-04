import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    userCode:{
        type: Number
    }
})

export default mongoose.model("User", userSchema);