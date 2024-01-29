import express from 'express'
import cors from 'cors'
import { router } from './routes/authRoutes.js'
import { postRouter } from './routes/postRoutes.js'
import morgan from 'morgan'
import dotenv from 'dotenv'


dotenv.config()
//  database 
import db from './db/db.js'
const Db = db
Db() 


const app = express()

//cors middleware
app.use(express.json())
// app.use(express.urlencoded({extended: true}))
app.use(cors(
    {origin:"http://localhost:3000"}
))  //



//********* */ server 
// app.post("/api/register", (req, res) => {
//      console.log("register information here => ", req.body )
// })

//********** routes
app.use("/api", router)
app.use("/api", postRouter)

const port = process.env.PORT 

app.listen(port, () => {
    console.log(`server is running on port number http://localhost:${port}`)
})