import { useState, useEffect } from "react"
import axios from 'axios'
import { Card, Space } from 'antd';

const Blog = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
      axios.get("http://localhost:8000/api/data")
      .then(data => {
        setUsers(data.data)
        setLoading(false)
      } )
      .catch(e => console.log(e))
      // fetch("http://localhost:8000/api/data")
      //    .then((res) => res.json())
      //    .then(data => console.log(data[0].title))
      //    .catch(e => console.log(e))

  },[])
  // console.log(user.data[0].title)
  if(loading){
    return <h1>Loading...</h1>
  }
  return (
    <>
      <h1 className="display-4 text-center">Blog</h1>
       {users && users.map((user) => (
       
            <Space direction="vertical" size={16} key={user.id} style={{marginTop: "2rem"}}>
          
              <Card title={user.title} style={{ width: 300, margin: "10px"}}>
              <p>{user.body}</p>

              </Card>
            </Space>
       ) )}
    </>
  )
}

export default Blog