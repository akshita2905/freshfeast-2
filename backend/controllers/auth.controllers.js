import User from "../models/user.models.js"
import bcrypt from "bcryptjs"
import getToken from "../utils/tokens.js"

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
            maxAge: 7*24*60*60,     //in seconds
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
        req.clearCookie("token")
        return res.status(200).json({message: "logout success"})
    } catch (error) {
        console.log(`logout error ${error}`)
    }
}