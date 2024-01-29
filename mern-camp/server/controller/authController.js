import dotenv from 'dotenv'
import { User } from "../models/user.model.js"
import { hashPassword, comparePassword } from "../helpers/auth.js"
import jwt from 'jsonwebtoken'



dotenv.config()
// console.log(process.env.JWT_SECRET)
// register controller
export const registerController = async (req,res) => {
    // console.log("register information here => ", req.body )
    const {name, email, password, secret} = req.body

    // validation 
    if(!name) {
      return res.json({
        error: "name is required"
      })
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "password is required and must be 6 characters long"
      })
    }
    if(!secret) {
      return res.json({
        error: "secret is required"
      })
    }
    
    const exist = await User.findOne({ email })
    if(exist) {
      return res.json({
        error: "email is taken"
      })
    }
    
    // hash 
    const HashPassword = await hashPassword(password);

    const user = new User({name, email, password: HashPassword, secret});
    
    try {
        await user.save()
        return res.json({
            ok: true
        })
        // return res.send(
        //     user
        // )
    } catch (error) {
        console.log("db connection failed")
        res.status(400).send("db connection failed")
    }

} 

// login controller

export const loginController = async (req, res) => {
    // console.log(req.body)
      try {
        const {email, password} = req.body 
        // check if our db has user with that email   
          const user = await User.findOne({email})
          if (!user) {
            return res.json({
             error: "No user found"
            })
          }
          // check password
        const match = await comparePassword(password, user.password)
        if (!match) {
          return res.json({
            error: "wrong password"
          })
        }
        // jwt token 
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"})
          
        // user.email = undefined
        user.password = undefined
        user.secret = undefined
        res.json({
            token,
            user,
        })

      } catch (error) {
        console.log(error)
        return res.json({
          error : "Error login, please try again"
        })
      }
}
// forgot controller 

export const forgotController = async (req, res) => {
  //  console.log(req.body)
  const {email, newPassword, secret} = req.body

   if(!newPassword || !newPassword > 6) {
    return res.json({
      error: "New password is required and should be 6 character long"
    })
    }
    if (!secret) {
      return res.json({
        error: "Secret is required"
      })
    }
    const user = await User.findOne({email, secret})
    if (!user){
      return res.json(
        {
          error : "We can't verify you with that details"
        }
      )
    }

    try {
      const hashed = await hashPassword(newPassword)
      await User.findByIdAndUpdate(user._id, { password : hashed })
      return res.json(
        {
          success: "Congrats! now you can login your new password"
        }
      )
    } catch (error) {
      console.log(error)
      res.json({
        error: "something wrong, please try again"
      })
    }

   }

export const currentUserController = async (req, res) => {
  // console.log(req.user)
   try {
     const user = await User.findById(req.user._id)
    //  res.json(user)

     return res.json({ ok: true})
   } catch (error) {
    console.log(error)
    // res.json({
    //   error: "current user missing"
    // })
   }
}


