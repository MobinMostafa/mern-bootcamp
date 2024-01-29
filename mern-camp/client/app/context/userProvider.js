"use client"
import axios from "axios"
import { useState, useEffect } from "react"
import UserContext from "./userContext"
import { useRouter } from "next/navigation"



const UserProvider = ({children}) => {

   
    const [state, setState] = useState({
        user: {},
        token: "",
    });
    useEffect(() => {
        setState(JSON.parse(window.localStorage.getItem("auth")))
    }, [])

     // next navigation router
    const router = useRouter()

      // token user json

      const token = state && state.token ? state.token : ""
      axios.defaults.baseURL = process.env.NEXT_PUBLIC_API; 
      axios.defaults.headers.common['Authorization'] =`Bearer ${token}`;
    //   axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  

    // Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
     let res = error.response
     if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        setState(null)
        window.localStorage.removeItem("auth")
        router.push("/login")
     }
  });

    return (
        <UserContext.Provider value={[state, setState]}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider