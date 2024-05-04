import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
dotenv.config();

const userSchema = new mongoose.Schema({
    userCode: { 
        type: Number,
        required: true, 
        unique: true,
        minlength:6
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

// --> hash the password
userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// --> check password
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

// --> for image
userSchema.methods.toJSON = function(){
    const obj = this.toObject();
    if(obj.image){
        obj.image = `${process.env.PUBLIC_URL}/users/${obj.image}`;
    }else{
        obj.image = `${process.env.PUBLIC_URL}/icons/user.svg`;
    }
    return obj;
};

// --> generate token
userSchema.methods.generateToken = function(){
    let secret = process.env.JWT_SECRET;
    let expiresDate = process.env.JWT_EXPIRES_IN;
    return jwt.sign({id: this._id, role: this.role}, secret,{
        expiresIn: expiresDate,
    });
}

export default mongoose.model("User", userSchema);