import React, { useState } from 'react'
import { useUserAuthStore } from '../Store/userAuthStore'
import { Eye, EyeOff,  Loader2, MessageSquare, User } from 'lucide-react';

import {Link} from 'react-router-dom'
import AuthImagePattern from '../Component/AuthImagePattern';
import toast  from 'react-hot-toast'

const SignupPages = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useUserAuthStore()
  
  const validateForm = () => {
    if(!formData.fullName.trim() ) {
      return toast.error("required full name") 
    }
    if(!formData.email.trim()) {
      return toast.error("required email")
    }
    if(!/\S+@\S+\.\S+/.test(formData.email)) {
      returntoast.error("Please enter a valid email address")  
    }
    if (!formData.password) return toast.error("Password is required");
    if(formData.password.length < 6) {
     return toast.error("Password must be at least 6 characters long")
    }
   
    return true
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const success = validateForm()
    // Add your form submission logic here
    if (success === true) {
      signup(formData)
    }
  }

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12 w-full'>
        <div className='w-full max-w-md mx-auto'>
          <div className='text-center mb-6'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-primary'/>
              </div>
              <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
              <p className='text-base-content/60'>Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative w-full">
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}> 
              {isSigningUp ? (
                <>
                  <Loader2 className="animate-spin size-5" />
                  Loading... 
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>


          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title= "jon our community"
        subtitle= "Connect with friends, share moments, and stay in touch with your loved ones."
      />

    </div>
  ) 
}

export default SignupPages