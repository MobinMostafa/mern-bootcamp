import dotenv from 'dotenv'
import { expressjwt } from "express-jwt"


dotenv.config()


export const requireSignIn = expressjwt({ 
    secret: process.env.JWT_SECRET, 
    algorithms: ['HS256'],
    requestProperty: "user"
 }) 

// export const requireSignIn = async () => {
//     jwt.verify(token, process.env.JWT_SECRET)
// }

