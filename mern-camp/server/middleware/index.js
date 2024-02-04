import dotenv from 'dotenv'
import { expressjwt } from "express-jwt"
import { Post } from '../models/post.model.js'


dotenv.config()


export const requireSignIn = expressjwt({ 
    secret: process.env.JWT_SECRET, 
    algorithms: ['HS256'],
    requestProperty: "user"
 }) 

 export const canEditDeletePost = async (req,res,next) => {
     try {
        const post = await Post.findById(req.params._id)
        // console.log(post)
        if(req.user._id != post.postedBy){
            return res.status(400).send("Unauthorized")
        }else{
            next()
        }
     } catch (error) {
        console.log(error)
     }
 } 

// export const requireSignIn = async () => {
//     jwt.verify(token, process.env.JWT_SECRET)
// }

