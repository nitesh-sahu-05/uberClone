import React from 'react'
import { Link } from 'react-router-dom'

const FinishRide = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
            props.setFinishPanel(false)
        }}
        className="cursor-pointer p-3 text-center w-[90%]  absolute top-0"
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-semibold mt-4 mb-5">Finish This Ride</h3>
        
        <div className='flex items-center justify-between mt-5 mb-6 p-4 border-2 border-yellow-300 rounded-lg'>
          <div className='flex items-center justify-start gap-3'>
            <img className='h-12 w-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwuK6uK_DJOQbIPXKuHUtLCauwHZ3N7kXhBI8WP4bJ3g&s=10" alt="" />
            <h4 className='text-xl font-medium'>Nitesh sahu</h4>
          </div>
          <div>
            <h4 className='text-xl font-semibold'>2.2km</h4>
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

        <form ></form>

       <div className='mt-6 w-full'>
          <Link to="/captain-home" className="mt-5 w-full bg-green-600 text-white flex items-center justify-center font-semibold p-3  rounded-lg">
          Finish Ride{" "}
        </Link>
        <p className=' mt-6 text-sm text-center'>click on finish ride if you completed the payment</p>
       </div>

      </div>
    </div>
  )
}

export default FinishRide
