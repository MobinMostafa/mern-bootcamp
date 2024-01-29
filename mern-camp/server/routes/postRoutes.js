import express from 'express'
// formidable middleware for image upload
import formidable from 'express-formidable'

export const postRouter = express.Router()

//middleware import 
import { requireSignIn} from '../middleware/index.js'
//post controller 
import { createPostController, uploadImageController } from '../controller/postController.js'

// post route
postRouter.post('/create-post',requireSignIn, createPostController)
// image route
postRouter.post('/upload-image',
      requireSignIn, 
      formidable({
    maxFileSize: 5 * 1024 * 1024   //formidable middleware
}), uploadImageController)