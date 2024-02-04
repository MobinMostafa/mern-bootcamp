"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'
import UserContext from '../context/userContext'
import { useRouter } from 'next/navigation'


const Menu = () => {
  const [state, setState] = useContext(UserContext)
  const router = useRouter()
  const navLinks = [
    {
      title : "Home",
      href : '/'
    },
    {
      title : "Login",
      href : '/login'
    },
    {
      title : "Register",
      href : '/register'
    }
  ]
  
  const pathName = usePathname()
  const active ="#F6B17A"
  const logout = () => {
    window.localStorage.removeItem("auth")
    setState(null)
    router.push("/login")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{backgroundColor: "#2D3250"}}>
        <div className="container-fluid">
          <Link className="navbar-brand text-light" href="/">Bookface</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"  />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {state !== null
             ? (
               <>   
               <li className="nav-item dropdown">
               
                <a className="nav-link dropdown-toggle text-light" style={{cursor: 'pointer'}} data-bs-toggle="dropdown" aria-expanded="false">
                {state && state.user && state.user.name} 
               </a>
               <ul className="dropdown-menu" style={{backgroundColor: "#2D3250"}}>
               <Link  className='dropdown-item'  style={{ color :`${pathName === "/user/dashboard" ? active  : '#fff' }`}} href="/user/dashboard" >
                    Dashboard
               </Link>
                  <li><a className="dropdown-item text-light " href="#">Action</a></li>
                  <li><a className="dropdown-item text-light" href="#">Another action</a></li>
                  <li><a className="dropdown-item text-light" href="#">Something else here</a></li>
                </ul>
               </li>
                {/* <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown button
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul> */}
               

               <li className="nav-item">
                   <a className='nav-link' onClick={logout}  style={{color: "#fff", cursor: "pointer" }}>Logout</a>
               </li>
               </>
             )
             :
             navLinks.map((navLink) => (
                <li className="nav-item" key={navLink.title}>
                   <Link className='nav-link' style={{ color :`${pathName === navLink.href ? active : '#fff' }`}}  href={navLink.href}>{navLink.title}</Link>
                </li>
              )) 
             
            } 
            </ul>

          </div>
        </div>
      </nav>

    </>
  )
}

export default Menu