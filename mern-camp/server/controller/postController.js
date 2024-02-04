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

// post rendering controller 

export const postsByUser = async (req,res) => {
    try {
      // const posts = await Post.find({ postedBy : req.user._id})
      const posts = await Post.find()
        .populate("postedBy", "_id name image")
        .sort({createdAt: -1})
        .limit(10)
        // console.log(posts)
      res.json(posts)
    } catch (error) {
      console.log(error)
    }
}



export const userPostController = async (req,res) =>{
    // console.log("params", req.params._id)
     try {
        const postEdit = await Post.findById(req.params._id)
        res.json(postEdit)
     } catch (error) {
        console.log(error)
     }
}

// postUpdateController

export const postUpdateController = async (req, res) => {
//    console.log(req.body)
   try {
    const post = await Post.findByIdAndUpdate(req.params._id, req.body, { new: true})
    res.json(post)
   } catch (error) {
    console.log(error)
   }
}

// deletePostRouter 

export const deletePostRouter = async (req, res) => {
     try {
        const post = await Post.findByIdAndDelete(req.params._id)

        // remove image from cloudinary
        if(post.image && post.image.public_id){
            const image = await cloudinary.uploader.destroy(post.image.public_id)
        }

        res.json({ok: true})
     } catch (error) {
        console.log("error delete", error)
     }
}