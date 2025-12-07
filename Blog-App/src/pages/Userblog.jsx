import React, { useEffect, useState } from 'react'
import axios from "axios"
import Blogcard from '../components/Blogcard'
const Userblog = () => {
    const [blogs, setblogs] = useState([])
    const [user, setuser] = useState(null)

  const getUserBlogs = async() =>{
    try{
        const id = localStorage.getItem("userId")
      const {data} = await axios.get(`https://mern-blog-app-yz1w.onrender.com/user-post/${id}`)
    if(data.success){
      setuser(data.userBlog)
      setblogs(data.userBlog.posts)
      console.log(data.userBlog.posts)
    }
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
  getUserBlogs();
  }, [])
  
  return (
    <>
    
    <div className='flex flex-col items-center justify-center h-[50vh] bg-[url("https://images.unsplash.com/photo-1617713964959-d9a36bbc7b52?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHdoaXRlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D")]  bg-contain'>
    <h1 className='text-6xl font-bold text-slate-900' style = {{textShadow:"6px 4px 4px rgba(0,0,0,0.6)"}}>MY BLOGS...</h1>
    </div>
    <div className='flex gap-4 p-4  justify-center flex-wrap'>
          {blogs.length === 0 ? (
            <h1>No Blogs</h1>
          ):(
            blogs.map((blog)=>(
            <Blogcard key={blog._id}
            id = {blog?._id}
            isUser = {localStorage.getItem("userId")=== user?._id}
            title= {blog?.title}
            content = {blog?.content}
            image = {blog?.image}
            username={user.username}
            time = {blog?.createdAt}
            />
          ))
          )}
        </div>
    
    </>
  )
}

export default Userblog