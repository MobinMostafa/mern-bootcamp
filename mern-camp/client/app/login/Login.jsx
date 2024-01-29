"use client"

import { Button, Form, SignHeader } from '../components'
import { useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { ReloadOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import UserContext from '../context/userContext'



const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
 
    const [loading, setLoading] = useState(false)
    // use context hook
    const [state, setState] = useContext(UserContext)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(name, email, password, secret)
        try {
          setLoading(true)
          const { data } = await axios.post(`/login`, {
            email,
            password,
          })
          // update context
          setState({
            user: data.user,
            token: data.token 
          })
          //save in local storage
         window.localStorage.setItem("auth", JSON.stringify(data))

          // console.log(data)
          setLoading(false)
          // router.push("/")
          setEmail("")
          setPassword("")

          if (data.error) {
            toast.error(data.error);
            setLoading(false);
          }
      
          // console.log(data)
        } catch (err) {
          setLoading(false)
          // toast.error(err.response.data)
          
        } 
    }
    if (state && state.token) router.push("/user/dashboard")
  return (
    <> 
      {/* {JSON.stringify(state)} */}
      <SignHeader headerText={"Login"} className={"background-bg"} />
       <div className="container-fluid">
          <div className="col-md-6 offset-md-3 my-5">
            <form onSubmit={handleSubmit}>

                <Form 
                   className={"mb-3"} 
                   type={"email"} 
                   placeholder={"Enter your email"} 
                   label={"Your email"}
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                     />

                <Form 
                   className={"mb-3"} 
                   type={"password"} 
                   placeholder={"Enter your password"} 
                   label={"Your password"}
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                     />
               <div className="d-grid mx-auto">
               <Button type={"submit"} className={"mt-2"}  buttonText= {loading ? <ReloadOutlined spin={true} /> : "Login" } />
               </div>
               <p className='text-center mt-4'>Are you not register ? please register here 
                <Link href="/register" className='fw-bold lnk'> Register</Link>
               </p>
               <p className='text-center mt-4'> 
                <Link href="/forgot-password" className='fw-bold text-danger'>Forgot password</Link>
               </p>
            </form>
          </div>
       </div>
    </>
  )
}

export default Login