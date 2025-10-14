import User from "../models/user.models.js"
import bcrypt from "bcryptjs"
import getToken from "../utils/tokens.js"
import { sendOtpMail } from "../utils/mails.js"

export const signUp = async (req, res) => {
    try {
        const {fullName, email, password, mobile, role} = req.body
        let user = await User.findOne({email})
        if (user) {
            return res.status(400).json({message: "User excsist"})
        }
        if (password.length < 6) {
            return res.status(400).json({message: "atleast 6"})
        }
        if (mobile.length < 10) {
            return res.status(400).json({message: "must be 10"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({
            fullName,
            email,
            mobile, role,
            password: hashedPassword
        })

        const token = await getToken(user._id)
        res.cookie("token", token, {
            secure: false,          //not https
            samesite: "strict",     //when secure false samesite should be strict
            maxAge: 7*24*60*60*1000,     //in seconds
            httpOnly: true
        })

        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({message: `sign up error ${error}`})
    }
    
}

export const signIn = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message: "User does not excsist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(400).json({message: "Password doesnt match"})
        }

        const token = await getToken(user._id)
        res.cookie("token", token, {
            secure: false,          //not https
            samesite: "strict",     //when secure false samesite should be strict
            maxAge: 7*24*60*60,     //in seconds
            httpOnly: true
        })

        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({message: `sign in error ${error}`})
    }
    
}

export const signOut = async(req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message: "logout success"})
    } catch (error) {
        console.log(`logout error ${error}`)
    }
}

export const sendOtp = async (req, res) => {
    try {
        const {email}=req.body
        const user=await User.findOne({email})
        if (!user) {
            return res.status(400).json({message: "User does not exsist"})
        }
        const otp = Math.floor(1000 + Math.random()*9000).toString()
        user.resetOtp=otp
        user.otpExpires=Date.now()+5*60*1000 //after 5 mins 60 mins to milliseconds *1000
        user.isOtpVerified=false
        await user.save()
        await sendOtpMail(email, otp)
        return res.status(200).json({message: "otp sent succesfully"})
    } catch(error) {
        return res.status(500).json(`send otp error ${error}`)
    }
}

export const verifyOtp=async (req, res) => {
    try {
        const {email, otp} = req.body
        const user = await User.findOne({email})
        if (!user || user.resetOtp!=otp || user.otpExpires<Date.now()) {
            return res.status(400).json({message:"invalid otp"})
        }
        user.isOtpVerified = true
        user.resetOtp=undefined
        user.otpExpires=undefined
        await user.save()
        return res.status(200).json({ message: "otp verified successfully" })
    } catch (error) {
        return res.status(500).json(`verify otp error ${error}`)
    }
}

export const resetPassword = async (req, res) => {
    try {
        const {email, newPassword} = req.body
        const user=await User.findOne({email})
        if (!user || !user.isOtpVerified) {
            return res.status(400).json({message: "User does not exist"})
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password=hashedPassword
        user.isOtpVerified=false
        await user.save()
        return res.status(200).json({message: "password reset successfully"})
    } catch (error) {
        return res.status(500).json(`reset otp error ${error}`)
    }
}