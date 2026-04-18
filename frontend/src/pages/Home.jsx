import React from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'

const Home = () => {
  
  return (
    <div>
      <div className='bg-cover bg-bottom bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhZmljJTIwbGlnaHR8ZW58MHx8MHx8fDA%3D)] pt-8  h-screen flex justify-between flex-col w-full '>
        <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <div className='bg-white pb-7 py-5 px-10 flex flex-col items-center w-full'>
          <h2 className='text-2xl font-bold'>Get Started With Uber</h2>
          <Link to="/login" className='flex items-center justify-center w-full bg-black text-white py-2 px-4 rounded mt-5'>
            Continue
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
