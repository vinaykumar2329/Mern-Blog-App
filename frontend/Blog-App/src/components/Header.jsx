import React from 'react'
import {Link} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import { authActions } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Header = () => {
    let isLogin = useSelector((state)=>state.isLogin)
    isLogin = isLogin || localStorage.getItem("userId")


  const navigate = useNavigate();
  const dispatch = useDispatch();
    

    const handleLogout = () =>{
      try{
        dispatch(authActions.logout())
        toast.success("logout successfully")
        navigate("/login")
        localStorage.clear()
      }
      catch(err){
        console.log(err);
      }
    }
  return (
    <>
    <div className='flex justify-between w-full p-4 bg-slate-900 text-slate-100 shadow-2xl'>
      <div className='px-4 font-bold text-xl [text-shadow:0_0_8px_#aaffc3,0_0_16px_#aaffc3] '><Link to="/"><h1>BLOG APP</h1></Link></div>
        <div className='flex gap-6 font-bold tracking-wider '>
            {!isLogin &&
                (<>
                  <Link to="/login" > <button className='hover:[text-shadow:0_0_8px_#00ff00,0_0_16px_#00ff00] '>Login</button></Link>
            <Link to="/register"> <button className='hover:[text-shadow:0_0_8px_#ffcc00,0_0_16px_#ffcc00] '>Register</button></Link>
            </>)}

          {isLogin && (
            <>
            <Link to="/myblog"><button className='hover:[text-shadow:0_0_8px_#00ff00,0_0_16px_#00ff00]'>My Blog</button></Link>
            <Link to="/createblog"><button className='hover:[text-shadow:0_0_8px_#ffcc00,0_0_16px_#ffcc00] '>Create Blog</button></Link>
            <button onClick={handleLogout} className='hover:[text-shadow:0_0_8px_red,0_0_16px_red]'  >Logout</button>

            </>
            )}

        </div> 
        
    </div>
    </>
  )
}

export default Header