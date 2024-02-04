import { useContext } from "react"
import Avatar from "antd/es/avatar/avatar"
import renderHTML from "react-render-html"
import moment from "moment"
import PostImage from "../post-image/PostImage"
import { HeartOutlined, CommentOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import UserContext from "@/app/context/userContext"
import { useRouter } from 'next/navigation'


const PostList = ({posts, handleDelete}) => {
  const [state] = useContext(UserContext)
  const router = useRouter()
  return (
    <>
     {posts && posts.map((post) => (
        <div className="card mt-5" key={post._id}>
         <div className="card-header">
            <div>
                <Avatar size={40} className="mb-2">
                 {post.postedBy.name[0]}
                </Avatar> {" "}
                <span className="pt-2 ms-2">
                    {post.postedBy.name}
                </span>
                <span className="pt-2 ms-2">
                    {moment(post.createdAt).fromNow()}
                </span>
            </div>
         </div>
         <div className="card-body">
           { renderHTML(post.content) }
         </div>
         <div className="card-footer">
               {post.image && 
               <PostImage url={post.image.url} />
               }
             <div className="d-flex">
             <HeartOutlined className="text-danger pt-2 me-2 h5" style={{cursor: "pointer"}}/>
              <div className="pt-2 me-4">
                3 likes
              </div>
              <CommentOutlined className="text-danger pt-2 me-2 h5" style={{cursor: "pointer"}} />
              <div className="pt-2">
                4 comments
              </div>
               { state && state.user && state.user._id === post.postedBy._id && ( <>
                <EditOutlined onClick={() => router.push(`/user/post/${post._id}`)} className="text-danger pt-2 ms-auto h5" style={{cursor: "pointer"}} />
                <DeleteOutlined onClick={() => handleDelete(post)} className="text-danger pt-2 h5 me-4 ms-5" style={{cursor: "pointer"}} />
               </> ) }
             </div>
         </div>
      </div>
     ))}
    </>
  )
}

export default PostList