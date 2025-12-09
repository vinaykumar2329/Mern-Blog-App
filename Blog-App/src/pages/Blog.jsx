import React, { useEffect, useState } from 'react'
import Blogcard from '../components/Blogcard'
import axios from 'axios'

const Blog = () => {
  const [blogs, setblogs] = useState([])

  const getAllBlogs = async() =>{
    try{
      const {data} = await axios.get("https://mern-blog-app-yz1w.onrender.com/all-post")
    if(data.success){
      setblogs(data.posts || [])
      console.log(data.posts || [])
    }
    }
    catch(err){
      console.log(err)
      setblogs([])
    }
  }
  useEffect(() => {
  getAllBlogs();
  }, [])
  
  return (
    <>
    <div className='flex flex-col items-center justify-center h-[50vh] bg-[url("https://images.unsplash.com/photo-1617713964959-d9a36bbc7b52?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHdoaXRlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D")]  bg-contain'>
    <h1 className='text-6xl font-bold text-slate-900' style = {{textShadow:"6px 4px 4px rgba(0,0,0,0.6)"}}>BLOGS...</h1>
    </div>

    <div className='  flex gap-4 px-2 py-4 flex-wrap justify-center bg-cover bg-center '>
      {blogs.length === 0 ? ( 
        <h1>No Blogs</h1>
      ):(
        [...blogs].reverse().map((blog)=>(
        <Blogcard
         key={blog?._id}
        id = {blog?._id}
        isUser = {localStorage.getItem("userId")=== blog?.user?._id}
        title= {blog?.title}
        content = {blog?.content}
        image = {blog?.image}
        username = {blog?.user?.username}
        time = {blog?.createdAt}
        />
      ))
      )}
      
    </div>
    </>
  )
}

export default Blog