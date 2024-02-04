"use client"
import { SignHeader } from '@/app/components'
import CreatePost from '@/app/components/CreatePost'
import UserRoute from '@/app/components/routes/UserRoute'
import UserContext from '@/app/context/userContext'
import { useRouter } from 'next/navigation'
import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import PostList from '@/app/components/cards/PostList'
// import PostList from '@/app/components/cards/PostList'


const Dashboard = () => {

  const [state, setState] = useContext(UserContext);
  const [content, setContent] = useState("")
  const [image, setImage] = useState({})
  const [uploading, setUploading] = useState(false)
  const [posts, setPosts] = useState([])

  const router = useRouter()
  const postSubmit = async (e) => {
    e.preventDefault()
    // console.log(content)
     try {
      const {data} = await axios.post("/create-post", {content, image})
      // console.log(data)
        
      if(data.error){
        toast.error(data.error)
      }else{
        fetchUserPosts()
        toast.success("Post is created")
        setContent("")
        setImage({})
      }
     } catch (error) {
      console.log(error)
     }
  }
  const handleImage = async (e) => {
    const file = e.target.files[0]
    let formData = new FormData()
    formData.append("image", file)
    // console.log([...formData])
    setUploading(true)
    try {
      const { data } = await axios.post("/upload-image", formData)
      // console.log(" upload image ==> ", data)
      setImage({
        url: data.url,
        public_id: data.public_id,
      })
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }
   useEffect(() => {
     if (state && state.token) fetchUserPosts()
   }, [state && state.token])

   const fetchUserPosts = async () => {
       try {
        const { data } = await axios.get("/user-posts")
        //  console.log(data)
        setPosts(data)
       } catch (error) {
        console.log(error)
       }
   }

   const handleDelete = async (post) => {
        try {
          const answer = window.confirm("Are you sure")
          if(!answer) return 
          const {data} = await axios.delete(`/delete-post/${post._id}`)
          toast.error("Post deleted")
          fetchUserPosts()
        } catch (error) {
          console.log(error)
        }
   }

  return (
    <>
      <UserRoute>
       <SignHeader headerText={"News Feed"} className={"background-bg"} />
       <div className="container-fluid mt-2">
          <div className="row">
            <div className="col-md-3">
              <h2>Sidebar</h2>
            </div>
            <div className="col justify-content-center mx-md-4">
               <CreatePost
                content={content}
                postHeading={"Create New Post"}
                setContent={setContent}
                postSubmit={postSubmit}
                handleImage={handleImage}
                uploading={uploading}
                image={image}
                buttonText={"Create post"}
               />
              <PostList posts={posts} handleDelete={handleDelete} />
            </div>
          </div>
       </div>
       </UserRoute>
    </>
  )
}

export default Dashboard