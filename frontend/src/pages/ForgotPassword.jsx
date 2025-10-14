import React, { useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'
import axios from 'axios';

function ForgotPassword() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const handleSetOtp = async () => {
    try {
     const result =  await axios.post(`${serverUrl}/api/auth/send-otp`, {email}, {withCredentials: true})
     console.log(result)
     setStep(2)
    } catch (error) {
      console.log(error)
    }
  }

  const handleVerifyOtp = async () => {
    try {
     const result =  await axios.post(`${serverUrl}/api/auth/verify-otp`, {email, otp}, {withCredentials: true})
     console.log(result)
     setStep(3)
    } catch (error) {
      console.log(error)
    }
  }

  const handleResetPassword = async () => {
    if (newPassword != confirmPassword) {
      alert("Passwords do not match!");
      return 
    }
    try {
     const result =  await axios.post(`${serverUrl}/api/auth/reset-password`, {email, newPassword}, {withCredentials: true})
     console.log(result)
     navigate("/signin")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>
      <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
        <div className='flex items-center gap-4 mb-4'>
          <IoIosArrowRoundBack size={24} className='text-[#ff4d2d]' onClick={()=>navigate("/signIn")} />
          <h2 className='text-2xl font-semibold text-[#ff4d2d]'>Forgot Password</h2>
        </div>

        {step === 1 && (
          <div>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-gray-700 font-medium mb-1'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                className='w-full border-[1px] border-gray-300 rounded-lg px-3 py-2 focus:outline-none'
                placeholder='Enter your email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#fd5a3e] cursor-pointer`} onClick={handleSetOtp}>
            Send Otp
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className='mb-4'>
              <label
                htmlFor='otp'
                className='block text-gray-700 font-medium mb-1'
              >
                OTP
              </label>
              <input
                type='text'
                id='otp'
                className='w-full border-[1px] border-gray-300 rounded-lg px-3 py-2 focus:outline-none'
                placeholder='Enter Otp'
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>
              <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#fd5a3e] cursor-pointer`} onClick={handleVerifyOtp}>
              Verify
              </button>
            
          </div>
        )}

        {step === 3 && (
          <div>
            <div className='mb-4'>
              <label
                htmlFor='newPassword'
                className='block text-gray-700 font-medium mb-1'
              >
                New Password
              </label>
              <input
                type='text'
                id='newPassword'
                className='w-full border-[1px] border-gray-300 rounded-lg px-3 py-2 focus:outline-none'
                placeholder='Enter new Password'
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='confirmPassword'
                className='block text-gray-700 font-medium mb-1'
              >
                Confirm Password
              </label>
              <input
                type='text'
                id='confirmPassword'
                className='w-full border-[1px] border-gray-300 rounded-lg px-3 py-2 focus:outline-none'
                placeholder='Enter Confirm Password'
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
              <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#fd5a3e] cursor-pointer`} onClick={handleResetPassword}>
            Reset Password
            </button>
            
          </div>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword
