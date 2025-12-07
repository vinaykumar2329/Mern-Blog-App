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
            const {data} = await axios.get(`http://localhost:5000/get-post/${id}`)
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
            const {data} = await axios.put(`http://localhost:5000/update-post/${id}`,{title:inputs.title,content:inputs.content,image:inputs.image,})
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
    <div className='text-center  flex flex-col h-[90vh] justify-center items-center gap-3'>
      <h1>UPDATE POST</h1>
      <form className='flex flex-col gap-3 w-100 text-center' onSubmit={handleSubmit}>
        <input className='border-amber-300 border-2 outline-amber-600 px-3 py-2' type="text" name="title" value={inputs.title} onChange={handleChange} />
        <input className='border-amber-300 border-2 outline-amber-600 px-3 py-2'  type="text" name="content" value={inputs.content} onChange={handleChange} />
        <input className='border-amber-300 border-2 outline-amber-600 px-3 py-2'  type='url' name="image" value={inputs.image} onChange={handleChange} />
        <div className='flex justify-center'>
        <button className='bg-emerald-400 p-2 w-50 text-amber-50' type='submit'>POST</button>
        </div>
      </form>
    </div>
  )
}

export default Updateblog