"use client"

import { SignHeader } from "@/app/components"
import CreatePost from "@/app/components/CreatePost"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import UserRoute from "@/app/components/routes/UserRoute"
import { toast } from "react-toastify"

const EditPost = () => {
    const [content, setContent] = useState("")
    const [image, setImage] = useState({})
    const [uploading, setUploading] = useState(false)
    const [post, setPost] = useState({})
    const router = useRouter()
    const param = useParams()
    const _id = param._id
   
    // console.log("router", _id)
   
 

    useEffect(() => {
        if (_id) fetchPost()
        },[_id])

        const fetchPost = async () => {
          try {
              const { data } = await axios.get(`/user-post/${_id}`)
              setPost(data)
              setContent(data.content)
              setImage(data.image)
          } catch (error) {
              console.log(error)
          }
      }
    const postSubmit = async (e) => {
       e.preventDefault()
       try {
          const {data} = await axios.put(`/update-post/${_id}`, {content, image})
          if(data.error){
            toast.error(data.error)
          }else{
            toast.success("post updated successfully")
            router.push("/user/dashboard")
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
   return (
    <> 
     <UserRoute> 
      <SignHeader headerText={"News Feed"} className={"background-bg"} />
       <div className="container-fluid mt-2">
          <div className="row">

            <div className="col-md-8 offset-md-2 justify-content-center">
               <CreatePost
                postHeading={"Update Post"}
                content={content}
                setContent={setContent}
                postSubmit={postSubmit}
                handleImage={handleImage}
                uploading={uploading}
                image={image}
                buttonText={"update post"}
               />
              
            </div>
          </div>
       </div>
       </UserRoute>
    </>
  )
}

export default EditPost