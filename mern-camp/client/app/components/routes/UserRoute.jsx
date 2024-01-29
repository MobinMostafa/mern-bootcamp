"use client"
import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { SyncOutlined } from '@ant-design/icons'
import UserContext from '@/app/context/userContext'

const UserRoute = ({children}) => {
    const [ok, setOk] = useState(false)
    const router = useRouter()
    const [state] = useContext(UserContext)

    useEffect(() => {
       if(state && state.token) getCurrentUser()
    }, [state && state.token])

    const getCurrentUser = async () => {
        try {
            const { data } = await axios.get(`/current-user`)
            if (data.ok) setOk(true)
        } catch (error) {
             router.push("/login")
        }
    }
    process.browser && state === null && setTimeout(() => {
      getCurrentUser()
    },1000)
  return !ok ? (
      <SyncOutlined
        spin
        className='d-flex justify-content-center display-1 p-5 '
      />
    ) : (<>{children}</>)
}

export default UserRoute