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


const Register = () => {
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
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
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
          const { data } = await axios.post(`/register`, {
            name,
            email,
            password,
            secret
          })
          if (data.error) {
            toast.error(data.error);
            setLoading(false);
          }

          setLoading(false)
          setOk(data.ok)
          setName("")
          setEmail("")
          setPassword("")
          setSecret("")

     
          // console.log(data)
        } catch (err) {
          setLoading(false)
          
        } 
    }
    if (state && state.token) router.push("/user/dashboard")
  return (
    <>  
      <SignHeader headerText={"Register"} className={"background-bg"} />
       <div className="container-fluid">
          <div className="col-md-6 offset-md-3 my-5">
            <form onSubmit={handleSubmit}>
                <Form 
                    className={"my-3 mt-4"}
                    type={"text"} 
                    placeholder={"Enter your name"} 
                    label={"Your name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

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
                 
                <select className="form-select mb-3">
                   {selects.map((select) => (
                        <option key={select.id}>{select.qr}</option>
                   ))}
                </select>
               
               <Form 
                  className={"mb-3"} 
                  type={"text"} 
                  placeholder={"Enter your answer here"} 
                  label={"You can use this to reset your password if forgotten"}
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                   />
             
               <div className="d-grid mx-auto">
               <Button type={"submit"} className={"mt-2"}  buttonText= {loading ? <ReloadOutlined spin={true} /> : "Signup" } /> 
               {/*disabled validation=button   disabled={!name || !email || !password || !secret} */}
               </div>
               <p className='text-center mt-4'> Already register ? 
                <Link href="/login" className='fw-bold lnk'> Login</Link>
               </p>
            </form>
          </div>
          <div className="row">
            <div className="col">
              <Modal
               title="Congratulation"
               open={ok}
               onCancel={() => setOk(false)}
               footer={null}
              >
               <p>You have successfully registered</p>
                <Link href="/login">
                <Button type={"button"} className={"mt-2 btn-sm"}  buttonText={"Login"} />
                </Link>
              </Modal>
            </div>
          </div>
       </div>
    </>
  )
}

export default Register