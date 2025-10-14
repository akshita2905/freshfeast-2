import mongoose from "mongoose";

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Databse connected")
    } catch (e) {
        console.log(e)
    }
}

export default connectDb