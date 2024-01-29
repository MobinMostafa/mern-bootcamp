import React from 'react'
import 'react-quill/dist/quill.snow.css';
import { Avatar } from 'antd';
import ReactQuill from 'react-quill';
// import Post from './Post'
import Button from './Button'
import { CameraOutlined, LoadingOutlined } from '@ant-design/icons';



const CreatePost = ({content, setContent, postSubmit, handleImage, uploading,image }) => {
  return (
     <div className="card">
         <div className="card-header">
            <h2>Create New Post</h2>
         </div>
        <form onSubmit={postSubmit} >
            <div className="card-body">
                <ReactQuill 
                theme='snow'
                rows={4} 
                className={"py-2"}
                value={content}
                onChange={ e => setContent(e)}
                placeholder="write a  post"
                style={{backgroundColor: "none"}}
                 />
            </div>
           
                
         
            <div className="card-footer d-md-flex justify-content-between">
                <Button type={'submit'} buttonText={'Create post'} className={'mb-2'}/>
                <label className='mb-2' style={{cursor: "pointer"}}>
                 { image && image.url ? ( <Avatar size={30} src={image.url} className='mt-1' /> ) : uploading ? ( <LoadingOutlined style={{fontSize: "2rem"}} /> ) : <CameraOutlined style={{fontSize: "2rem"}} /> }
               
                <input onChange={handleImage}  type={"file"} accept="images/*" hidden />
                </label>
            </div>
        </form>
     </div>
  )
}

export default CreatePost