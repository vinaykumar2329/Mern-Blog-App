import axios from 'axios';
import React, { memo } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const Blogcard = memo(({title,content,image,username,time,id,isUser}) => {
  const navigate = useNavigate();
const handleEdit = () =>{
  navigate(`/updateblog/${id}`)
} 
const handleRead = () =>{
  navigate(`/readblog/${id}`)
}

const handleDelete = async() =>{
  try{
    const {data} = await axios.delete(`https://mern-blog-app-yz1w.onrender.com/delete-post/${id}`)
    if(data.success){
      alert("Blog Deleted")
      window.location.reload();
    }
  }
  catch(err){
    console.log(err);
  }
}    
function timeago(dateString){
  const date = new Date(dateString);
  const seconds = Math.floor((Date.now()-date.getTime())/1000);
  const minutes = Math.floor(seconds/60);
  const hours = Math.floor(minutes/60);
  const days = Math.floor(hours/24);
 
  if(seconds<60) return "just now";
  if(minutes<60) return `${minutes} min ago`;
  if(hours<24) return `${hours} hr ago`
  return `${days} d ago`

}
const formattedTime = timeago(time)
const firstLetter = typeof username === "string" && username.length>0 ? username[0].toUpperCase(): "?";
  return (
    <div className='flex flex-col gap-2 border-1 border-gray-300 w-100 h-90 justify-evenly px-2 py-2 bg-white rounded-2xl'>
      <div className='flex justify-between'>
        <div className='flex'>
        <div className='bg-slate-900 w-12 h-12 rounded-full text-center flex justify-center flex-col'>
          <h1 className='font-bold text-amber-50'>{firstLetter}</h1>
        </div>
        <div className='px-2 flex flex-col '>
        <h3 className='font-bold'>{username} </h3>
        <small className='text-sky-700'>{formattedTime}</small>
    </div>
      </div>
      {isUser && (
        <div className='flex  gap-1 '>
        <button onClick={handleEdit} className='text-xl text-amber-400'><FaEdit /></button>
        <button onClick={handleDelete} className='text-xl text-red-600'><MdDelete /></button>
      </div>
      ) } 
      </div>
      
      <div className='w-full h-50 overflow-hidden '>
       <img src={image} alt="" loading='lazy' className=' w-full h-full object-cover rounded-2xl' />
    </div>
      <div className='px-5'> 
        <h2 className='font-extrabold'>{title}</h2>
        <p className='line-clamp-2'>{content}...</p>
        <button onClick={handleRead} className='bg-slate-900 text-white px-2 p-1 rounded mt-2 text'>Read Blog..</button>
      </div>
    </div>
  )
})

export default Blogcard