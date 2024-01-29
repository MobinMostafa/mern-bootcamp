import mongoose from "mongoose";
import { User } from "./user.model.js";
const { ObjectId } = mongoose.Schema

const postSchema = mongoose.Schema({
    content : {
        type: {},
        required: true
    },
    postedBy : {
        type: ObjectId,
        ref: "User"
    },
    image: {
        url: String,
        public_id: String,
    },
    likes: [{type: ObjectId, ref: "user"}],
    comments: [
        {
            text: String,
            created: {type: Date, default: Date.now},
            postedBy: {
                type: ObjectId,
                ref: "User"
            }
        }
    ]
}, {timestamps: true })

export const Post = mongoose.model("Post", postSchema)