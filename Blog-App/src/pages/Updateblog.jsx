import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams,useNavigate } from 'react-router-dom'

const Updateblog = () => {
    const navigate = useNavigate()
    const [blog, setblog] = useState({})
    const [inputs, setinputs] = useState({})
    const id = useParams().id
    const getBlog = async() =>{
        try{
            const {data} = await axios.get(`https://mern-blog-app-yz1w.onrender.com/get-post/${id}`)
            if(data.success){
                setblog(data.post)
                setinputs({
        title:data.post.title,
        content :data.post.content,
        image: data.post.image,
      })
            }
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
      getBlog();
    }, [id])
    
     
     const handleChange = (e) =>{
    setinputs(prev =>({ ...prev,
      [e.target.name]:e.target.value
    }))
  }
    const handleSubmit = async (e) =>{
        e.preventDefault(); 
        try{
            const {data} = await axios.put(`https://mern-blog-app-yz1w.onrender.com/update-post/${id}`,{title:inputs.title,content:inputs.content,image:inputs.image,})
        if(data.success){
            toast.success("blog updated")
            navigate("/")
        }
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <div className='text-center min-h-screen w-full sm:p-5  flex flex-col h-[90vh] justify-center items-center gap-3 bg-[url("https://plus.unsplash.com/premium_photo-1674834298045-e405bc99076b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdWR8ZW58MHx8MHx8fDA%3D")] bg-cover bg-center'>
      <div className='w-[90%] max-w-xs border-4 border-white p-5 py-5 flex flex-col gap-3 rounded-md backdrop-blur-xs'>

      <h1 className='text-2xl mb-3'>UPDATE POST</h1>
      <form  className='flex flex-col gap-2 w-full text-start' onSubmit={handleSubmit}>

        <label htmlFor="username" className='font-bold'>Username</label>
        <input className='border-gray-500 border-2 px-3 py-2 rounded-2xl w-full'  type="text" name="title" value={inputs.title} onChange={handleChange} />

        <label htmlFor="email" className='font-bold'>Email</label>
        <input className='border-gray-500 border-2 px-3 py-2 rounded-2xl w-full' type="text" name="content" value={inputs.content} onChange={handleChange} />

        <label htmlFor="password" className='font-bold'>Password</label>
        <input className='border-gray-500 border-2 px-3 py-2 rounded-2xl w-full' type='url' name="image" value={inputs.image} onChange={handleChange} />

        <div className='flex justify-center'>
        <button className='bg-emerald-400 p-2 w-50 text-amber-50' type='submit'>POST</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Updateblog