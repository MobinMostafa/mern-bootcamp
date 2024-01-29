import mongoose from 'mongoose'

const db = async () => {
    try {
        await mongoose.connect(process.env.DB)
        console.log("db connected")
    } catch (error) {
         console.log(error)
    }
}

export default db
