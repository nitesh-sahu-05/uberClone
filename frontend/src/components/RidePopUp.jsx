import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
            props.setRidePopUpPanel(false)
        }}
        className="cursor-pointer p-3 text-center w-[90%]  absolute top-0"
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-semibold mt-4 mb-5">New Ride Available</h3>
        
        <div className='flex items-center justify-between mt-5 mb-6 p-4 bg-yellow-300 rounded-lg'>
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

        <div className='mt-4 flex w-full items-center justify-between'>
          <button onClick={()=>{
            props.setRidePopUpPanel(false)
         }} className="ml-2  bg-gray-300 text-gray-700 font-semibold p-3 px-8 rounded-lg">
          Ignore{" "}
        </button>
          <button onClick={()=>{
            props.setConfirmRidePopUpPanel(true)
        }} className="mr-2  bg-green-600 text-white font-semibold p-3 px-8 rounded-lg">
          Accept{" "}
        </button>
        </div>

      </div>
    </div>
  )
}

export default RidePopUp
