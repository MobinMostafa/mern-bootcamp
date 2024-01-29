import mongoose, {Schema} from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true 
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    secret: {
        type: String,
        required: true,
        min: 6,
        max: 64
    },
    about:{},
    photos: String,
    following: [{
            type: Schema.ObjectId,
            ref: "User"
        }
    ],
    followers: [
        {
            type: Schema.ObjectId,
            ref: "User"
        }
    ]
}, {timestamps:true})

export const User = mongoose.model("User", userSchema) 