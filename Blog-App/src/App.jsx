import React from 'react'
import Header from './components/Header'
import{Routes,Route} from "react-router-dom"
import Blog from './pages/Blog'
import Login from './pages/Login'
import Register from './pages/Register'
import Userblog from './pages/Userblog'
import Createblog from './pages/Createblog'
import Updateblog from './pages/Updateblog'
import Readblog from './pages/Readblog'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast';
import Snowfall from 'react-snowfall'


const App = () => {
  return (
    <> 

    <div className='flex flex-col min-h-screen relative'> 
    <Snowfall color='#82C3D9'/>  
    <Header />
    <Toaster />
    <main className='flex-1'>   
    <Routes>
    <Route path='/' element = {<Blog/>} />
    <Route path='/myblog' element = {<Userblog/>} />
    <Route path='/createblog' element = {<Createblog/>} />
    <Route path='/updateblog/:id' element = {<Updateblog/>} />
    <Route path='/readblog/:id' element = {<Readblog/>} />
    <Route path='/login' element = {<Login/>} />
    <Route path='/register' element = {<Register/>} />
    </Routes>
    </main>
    <Footer/>
    </div>
    </>

  )
}

export default App