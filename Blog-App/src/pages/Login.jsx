import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import {authActions} from '../redux/store'
import ReCAPTCHA from "react-google-recaptcha"


const SITE_KEY="6Le7fScsAAAAAJgw6K6_5PJosd6QjRmG_CxU8WHx";

const Login = () => {
  const navigate =useNavigate();
   const dispatch = useDispatch();


  const [captcha, setcaptcha] = useState("")
  const [inputs, setinputs] = useState({
    email:"",
    password:"",
  })

  const handleCaptchaChange = value => setcaptcha(value)

  const handleChange = (e) =>{
    setinputs(prev =>({ ...prev,
      [e.target.name]:e.target.value
    }))
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(!captcha){
        alert("plz fillcaptcha")
        return;
      }
    try{
      const {data} = await axios.post("https://mern-blog-app-yz1w.onrender.com/login",{email:inputs.email,password:inputs.password,captcha})
      if(data.success){
        localStorage.setItem("userId",data.user._id);
        dispatch(authActions.login())
        toast.success("Logged in succesfully")
        navigate("/")
      }

    }
    catch(error){
      if(error.response.status === 401 ){
        toast.error("Invalid Credentials")
      }
      if(error.response.status === 402 ){
        toast.error("User not registered")
      }
      console.log(error)
    }
  }
  return (
    <div className='text-center min-h-screen w-full flex flex-col  justify-center items-center gap-3 bg-[url("https://plus.unsplash.com/premium_photo-1674834298045-e405bc99076b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdWR8ZW58MHx8MHx8fDA%3D")] bg-cover bg-center'>
      <div className='w-[90%] max-w-xs border-4  border-white p-5 py-6 flex flex-col gap-3 rounded-md backdrop-blur-xs '>

      <h1 className='text-2xl mb-10'>Login</h1>
      <form className='flex flex-col gap-2 w-full  text-start ' onSubmit={handleSubmit}>
        <label htmlFor="email" className='font-bold'>Email</label>
        <input className='border-gray-500 border-2 px-3 py-2 rounded-2xl w-full'  type="email" name="email" value={inputs.email} onChange={handleChange} placeholder='Enter Your Email' />
        <label htmlFor="password" className='font-bold'>Password</label>
        <input className='border-gray-500 border-2  px-3 py-2 rounded-2xl w-full'  type="password" name="password" value={inputs.password} onChange={handleChange} placeholder='Enter Your Password' />
        <div className='flex flex-col justify-center items-center'>
           <ReCAPTCHA
                  sitekey={SITE_KEY}
                  onChange={handleCaptchaChange}
                  />
        <button className='bg-slate-900 p-2 w-50 text-amber-50 mt-6 rounded-md' type='submit'>LOGIN</button>
        </div>
      </form>
        <button onClick={()=>{navigate("/register")}} >Don't have a account? Please Register</button>
        </div>
    </div>
  )
}

export default Login