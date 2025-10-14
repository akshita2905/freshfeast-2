import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String
    }, 
    mobile :{
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum:["user", "owner", "deliveryboy"],
        required: true
    },
    resetOtp: {         // temporary storage of otp
        type:String
    },
    isOtpVerified: {
        type: Boolean,
        default: false
    },
    otpExpires: {
        type: Date
    }
}, {timestamps: true}) // automatically adds createdAt and updatedAt fields
const User = mongoose.model("User", userSchema) // returns a model constructor hence capital

export default User