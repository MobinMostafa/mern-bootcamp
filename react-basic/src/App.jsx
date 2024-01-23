
import { useEffect, useState } from "react"
import { ReloadOutlined  } from "@ant-design/icons"

const App = () => {
  const [user, setUser] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
      fetch("http://localhost:8000/api/user", {
        method: "GET"
      }).then((data) => data.json())
        .then((data) => {
          setUser(data.users)
          setLoading(false)
        })
        .catch((e) => console.log(e))
  }
  
 
  useEffect(() => {
       const products = async () => {
           const response = await fetch("https://fakestoreapi.com/products")
           const data = await response.json()
           setProducts(data)
           setLoading(false)
          //  console.log(data)
      } 
      products()
  }, [])
  if(loading){
    return <ReloadOutlined style={{height: "100vh"}} spin={true} className="display-4 d-flex justify-content-center align-items-center"/>
  }
  return (
    <>
      <div className="container-fluid">
          <div className="row my-4 ">
              { products && products.map((product) => (
                <div className="col-md-3" key={product.id}> 
                <div className="card text-center cursor-pointer" style={{width: '18rem', margin: '5px'}} >
                <img src={product.image} className="card-img-top img-fluid mx-auto" alt="..." style={{width:"200px", height: '300px'}} />
                <div className="card-body">
                  <h2>{product.title}</h2>
                  {/* <p className="card-text">{product.description}</p> */}
                  
                 <div className="mt-5 d-flex justify-content-between">
                 {/* <button className="btn btn-sm btn-danger text-start">View Details</button> */}
                  <button className="btn btn-sm btn-danger">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-check" viewBox="0 0 16 16">
  <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg>
                  </button>
                  <h3>${product.price}</h3>
                 </div>
                </div>
              </div>
              </div>
              )) }
          
          </div>
        <button className="btn btn-danger" onClick={fetchData} >Fetch data</button>
        {user && user.map((user, index) => (
             <div key={index}>
             <h2>{user.name}</h2>
                <h2>{user.age}</h2>
             </div>
          ))}
      </div>
    </>
  )
}

export default App





// import { useState } from "react"
//  const App = () => { 
//    const [email, setEmail] = useState("")
//    const [password, setPassword] = useState("")

//    const handleSubmit = (e) => {
//        e.preventDefault()
//        console.log(email, password)
//        setEmail("")
//        setPassword("")

//    }
//   return (
//    <>
//     <div className="container">
//        <h1 className="display-4 text-center">Sign up</h1>
//       <div className="row">
//       <div className="col-md-6 offset-md-3"> 
//       <form onSubmit={handleSubmit}>
//       <div className="mb-3">
//        <label  className="form-label">Email address</label>
//     <input type="email" className="form-control"
//       value={email}
//       onChange={e => setEmail(e.target.value)}
//       />
//     <div className="form-text"> We&apos;ll never share your email with anyone else.</div>
//   </div>
//   <div className="mb-3">
//     <label className="form-label">Password</label>
//     <input type="password" className="form-control" 
//      value={password}
//      onChange={e => setPassword(e.target.value)}
//      />
//   </div>

//   <button type="submit" className="btn btn-primary">Submit</button>
//    {/* <p>{handleSubmit.email} </p>
//    <p>{handleSubmit.password} </p> */}
// </form>
//     </div>
//     </div>
//   </div>
//    </>
//   )
// }

// export default App