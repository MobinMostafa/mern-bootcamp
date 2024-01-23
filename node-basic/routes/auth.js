import express from "express"
import { userController } from "../controller/authController.js"

const router = express.Router()

router.get("/user", userController)
 

 export default router