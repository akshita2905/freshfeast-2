import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js'
import cors from 'cors'
dotenv.config()

const app = express()
const port = process.env.PORT || 5000
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true  // allow cookies or authorization headers
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter) // Every route defined in authRouter will automatically be prefixed with /api/auth.

app.listen(port, () => {
    connectDb()
    console.log(`Server Started at port ${port}`)
})