"use client"

import { Button, Form, SignHeader } from '../components'
import { useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Modal } from 'antd'
import Link from 'next/link'
import { ReloadOutlined } from '@ant-design/icons'
import UserContext from '../context/userContext'
import { useRouter } from 'next/navigation'


const ForgotPassword = () => {
    const selects = [
        {
            id: 1,
            qr: "What is your favorite color ? "
        },
        {   
            id: 2,
            qr : "What is your best friend's name ? "
        },
        {
            id: 3,
            qr: "What city you were born"
        }
    ]

    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [secret, setSecret] = useState("")
    const [ok, setOk] = useState(false)
    const [loading, setLoading] = useState(false)

    const [state] = useContext(UserContext)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(name, email, password, secret)
        try {
          setLoading(true)
          const { data } = await axios.post(`/forgot-password`, {
            email,
            newPassword,
            secret
          })
          
    if (data.error) {
        toast.error(data.error);
        setLoading(false);
      }
  
      if (data.success) {
        toast.success(data.success);
        setEmail("");
        setNewPassword("");
        setSecret("");
        setOk(true);
        setLoading(false);
      }
        //   setLoading(false)
        //   setOk(data.ok)
        //   setEmail("")
        //   setNewPassword("")
        //   setSecret("")
          console.log(data)

        } catch (err) {
          setLoading(false)
        //   toast.error(err.response.data)
          
        } 
    }
    if (state && state.token) router.push("/user/dashboard")
  return (
    <>  
      <SignHeader headerText={"Forgot password"} className={"background-bg"} />
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
                   placeholder={"Enter your new password"} 
                   label={"Your password"}
                   value={newPassword}
                   onChange={(e) => setNewPassword(e.target.value)}
                     />
                 
                <select className="form-select mb-3">
                   {selects.map((select) => (
                        <option key={select.id}>{select.qr}</option>
                   ))}
                </select>
               
               <Form 
                  className={"mb-3"} 
                  type={"text"} 
                  placeholder={"Enter your answer here"} 
                  label={"Your secret key that type for registered form"}
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                   />
             
               <div className="d-grid mx-auto">
               <Button type={"submit"} className={"mt-2"}  buttonText= {loading ? <ReloadOutlined spin={true} /> : "Reset password" } /> 
               {/*disabled validation=button   disabled={!name || !email || !password || !secret} */}
               </div>
       
            </form>
          </div>

       </div>
    </>
  )
}

export default ForgotPassword