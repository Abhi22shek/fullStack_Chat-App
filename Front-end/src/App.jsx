import React, { useEffect } from 'react';
import './index.css'
import Navbar from './Component/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';

import SignupPage from './Pages/SignupPages';
import SettingPage from './Pages/SettingPage';
import ProfilePage from './Pages/ProfilePage';
import LoginPage from './Pages/LoginPage';
import { useUserAuthStore } from './Store/userAuthStore';
import {Loader} from 'lucide-react'
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './Store/useThemeStore';
import Home from './Pages/home';
const App = () => {
  const {authUser,isCheckingAuth,checkAuth} = useUserAuthStore()
  
  const {theme} = useThemeStore()

  useEffect(() =>  {
    checkAuth()
  },[checkAuth])

  console.log("AuthUser",authUser)

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
   <div  data-theme = {theme}>

      <Navbar/>


      <Routes>
        <Route path='/' element={authUser?<Home/>: <Navigate to='/login'/>}/>
        <Route path='/signup' element={!authUser?<SignupPage/>: <Navigate to='/'/>}/>
        <Route path='/login' element={!authUser?<LoginPage/>: <Navigate to='/'/>}/>
        <Route path='/settings' element={<SettingPage/>}/>
        <Route path='/profile' element={authUser?<ProfilePage/>: <Navigate to='/login'/>}/>
      </Routes>
  
    <Toaster/>

   </div>
  )
}

export default App