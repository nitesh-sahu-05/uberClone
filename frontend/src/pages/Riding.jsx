import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className='h-screen'>
        <Link to='/home' className='fixed  right-2  m-3 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="text-lg font-medium ri-home-3-line"></i>
        </Link>

      <div className ="h-1/2 w-screen">
          <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"  alt=''/>
      </div>

      <div className='h-1/2 p-4'>
        <div className='flex  justify-between items-center gap-1'>
         <img
          className="h-20"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7zy6GeYezGhl4-rKsmJWNa1-3FkVaTF2UvlBPRWVf5w&s=10"
          alt="Ride Image"
        />
        <div className='text-right '>
            <h2 className='text-lg font-medium'>Nitesh</h2>
            <h4 className='text-xl font-bold'>CG07 4999</h4>
            <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
        </div>
      </div>
     

      <div className="flex gap-2 flex-col justify-between items-center">
        
        <div className="w-full mt-5 ">

          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-2-fill text-lg"></i>
            <div>
              <h3 className="font-medium text-lg">562/111-a</h3>
              <p className="text-gray-600">Knkariya Taalab Ahamdabad</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 ">
            <i className="ri-money-dollar-box-line text-lg"></i>
            <div>
              <h3 className="font-medium text-lg">₹150</h3>
              <p className="text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

      </div>
        <button  className="mt-5 w-full bg-green-600 text-white font-semibold p-2 rounded-lg">
          Make a Payment
        </button>
      </div>

    </div>
  )
}

export default Riding
