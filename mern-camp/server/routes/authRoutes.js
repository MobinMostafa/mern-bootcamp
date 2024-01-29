import express from 'express'
import {loginController, registerController, currentUserController, forgotController } from '../controller/authController.js'


export const router = express.Router()

//middleware import 
import { requireSignIn} from '../middleware/index.js'

// register routes 
router.post("/register", registerController )
// login routes 
router.post("/login", loginController )
// forgot routes
router.post("/forgot-password", forgotController )
 // current user  
router.get("/current-user", requireSignIn, currentUserController)



