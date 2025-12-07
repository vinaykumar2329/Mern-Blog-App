import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
const Createblog = () => {
    const id = localStorage.getItem('userId')
    const navigate = useNavigate();
    const [inputs, setinputs] = useState({
        title:'',
        content:'',
        image:'',
    })
     const handleChange = (e) =>{
    setinputs(prev =>({ ...prev,
      [e.target.name]:e.target.value
    }))
  }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        try{
            const {data} = await axios.post("https://mern-blog-app-yz1w.onrender.com/create-post",{title:inputs.title,content:inputs.content,image:inputs.image,user:id})
        if(data.success){
            navigate("/")
            toast.success("New Blog Created")
        }
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    //  <div className='text-center  flex flex-col h-[90vh] justify-center items-center gap-3'>
      
    <div className='text-center  flex flex-col h-[90vh] justify-center items-center gap-3 bg-[url("https://plus.unsplash.com/premium_photo-1674834298045-e405bc99076b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdWR8ZW58MHx8MHx8fDA%3D")] bg-cover bg-center'>
      <div className='border-4 border-white p-5 py-5 flex flex-col gap-3 rounded-md backdrop-blur-xs'>
      <h1>CREATE POST</h1>
      <form className='flex flex-col gap-3 w-100 text-center' onSubmit={handleSubmit}>
        <input className='border-gray-500 border-2 px-3 py-2 rounded-2xl'  type="text" name="title" value={inputs.title} onChange={handleChange} placeholder='Enter Title' />
        <input className='border-gray-500 border-2 px-3 py-2 rounded-2xl'   type="text" name="content" value={inputs.content} onChange={handleChange} placeholder='Enter Description' />
        <input className='border-gray-500 border-2 px-3 py-2 rounded-2xl'   type='url' name="image" value={inputs.image} onChange={handleChange} placeholder='Enter Image URL'/>
        <div className='flex justify-center'>
        <button className='bg-slate-900 p-2 w-50 text-amber-50 mt-5 rounded-md'  type='submit'>POST</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Createblog