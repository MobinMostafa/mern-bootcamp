import dotenv from 'dotenv'
import { Post } from "../models/post.model.js"
// cloudinary import 
import { v2 as cloudinary } from 'cloudinary'

dotenv.config()
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
  });

// create post controller
export const createPostController = async (req, res) => {
    // console.log(req.body)
    const {content, image} = req.body 
    if(!content.length) {
        return res.json({
            error: "content is required"
        })
    }

    try {
        const post = new Post({ content,image, postedBy: req.user._id })
        await post.save()
        res.json(post)
    } catch (error) {
        console.log(error)
    }
}

export const uploadImageController = async (req, res) => {
    // console.log(req.files)
    try {
        const result = await cloudinary.uploader.upload(req.files.image.path)
        // console.log((result))
        res.json({
            url: result.secure_url,
            public_id: result.public_id
        })
    } catch (error) {
        console.log(error)
        res.json({
            error: "something error"
        })
    } 
}