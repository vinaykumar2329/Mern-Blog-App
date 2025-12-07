import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast'

import { useDispatch } from 'react-redux'
import {authActions} from '../redux/store'
const Login = () => {
  const navigate =useNavigate();
   const dispatch = useDispatch();

  const [inputs, setinputs] = useState({
    email:"",
    password:"",
  })

  const handleChange = (e) =>{
    setinputs(prev =>({ ...prev,
      [e.target.name]:e.target.value
    }))
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      const {data} = await axios.post("https://mern-blog-app-yz1w.onrender.com/login",{email:inputs.email,password:inputs.password})
      if(data.success){
        localStorage.setItem("userId",data.user._id);
        dispatch(authActions.login())
        toast.success("Logged in succesfully")
        navigate("/")
      }
      else{
        alert("invalid credentials")
      }
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <div className='text-center  flex flex-col h-[90vh] justify-center items-center gap-3 bg-[url("https://plus.unsplash.com/premium_photo-1674834298045-e405bc99076b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdWR8ZW58MHx8MHx8fDA%3D")] bg-cover bg-center'>
      <div className='border-4 border-white p-5 py-6 flex flex-col gap-3 rounded-md backdrop-blur-xs'>
      <h1 className='text-2xl mb-10'>Login</h1>
      <form className='flex flex-col gap-2 w-100 text-start' onSubmit={handleSubmit}>
        <label htmlFor="email" className='font-bold'>Email</label>
        <input className='border-gray-500 border-2 px-3 py-2 rounded-2xl'  type="email" name="email" value={inputs.email} onChange={handleChange} placeholder='Enter Your Email' />
        <label htmlFor="password" className='font-bold'>Password</label>
        <input className='border-gray-500 border-2  px-3 py-2 rounded-2xl'  type="password" name="password" value={inputs.password} onChange={handleChange} placeholder='Enter Your Password' />
        <div className='flex justify-center'>
        <button className='bg-slate-900 p-2 w-50 text-amber-50 mt-6 rounded-md' type='submit'>LOGIN</button>
        </div>
      </form>
        <button onClick={()=>{navigate("/register")}} >Don't have a account? Please Register</button>
        </div>
    </div>
  )
}

export default Login