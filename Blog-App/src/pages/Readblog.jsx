import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const Readblog = () => {
      const [blog, setblog] = useState({})
      const [user, setuser] = useState({})
      const id = useParams().id
    const getBlog = async() =>{
        try{
            const {data} = await axios.get(`https://mern-blog-app-yz1w.onrender.com/get-post/${id}`)
            if(data.success){
                setblog(data.post)
                setuser(data.post.user)   
            }
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
      getBlog();
    }, [id])

  return (
    <>
    <div className='flex flex-col items-center justify-center h-[50vh] bg-[url("https://images.unsplash.com/photo-1617713964959-d9a36bbc7b52?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHdoaXRlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D")]  bg-contain'>
    
    <img src={`${blog.image}`} alt="blog-image" className='h-50 w-80 rounded-2xl' />
    </div>
    <div className='px-15 py-5'>
      <div className='flex justify-between'>
      <h1 className='  text-4xl font-semibold'>{blog.title}</h1>
      

      </div>
      <p className='text-xl pt-3 text-gray-700'>{blog.content}</p>
      
      <div className='flex  justify-end mt-3'>
        <div>
      <h1 className='text-2xl font-bold'>Written By - {user.username}</h1>
      <h1 className='text-yellow-500 font-bold'>posted on - {
        new Date(blog.createdAt).toLocaleDateString("en-IN",{
          day:"2-digit",
          month:"short",
          year:"numeric",
        })}
        </h1>
        </div>
      </div>
    </div>
    </>
  
  )
}

export default Readblog