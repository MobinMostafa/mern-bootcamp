import express from 'express'
// formidable middleware for image upload
import formidable from 'express-formidable'

export const postRouter = express.Router()


//post controller 
import { createPostController, uploadImageController, postsByUser, userPostController, postUpdateController,deletePostRouter } from '../controller/postController.js'

//middleware import 
import { canEditDeletePost, requireSignIn} from '../middleware/index.js'

// post route
postRouter.post('/create-post',requireSignIn, createPostController)
// image route
postRouter.post('/upload-image',
      requireSignIn, 
      formidable({
    maxFileSize: 5 * 1024 * 1024   //formidable middleware
}), uploadImageController)

// post rendering

postRouter.get("/user-posts", requireSignIn, postsByUser)

// post id for details
postRouter.get("/user-post/:_id", requireSignIn, userPostController)

// post update 

postRouter.put("/update-post/:_id", requireSignIn, canEditDeletePost, postUpdateController)

// post delete

postRouter.delete("/delete-post/:_id", requireSignIn, canEditDeletePost, deletePostRouter)