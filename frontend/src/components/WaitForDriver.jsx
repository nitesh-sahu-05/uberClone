import React from 'react'

const WaitForDriver = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setWaitForDriver(false);
        }}
        className="cursor-pointer p-3 text-center w-[90%]  absolute top-0"
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i>
      </h5>

      <div className='flex  justify-between items-center gap-1'>
         <img
          className="h-20"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7zy6GeYezGhl4-rKsmJWNa1-3FkVaTF2UvlBPRWVf5w&s=10"
          alt="Ride Image"
        />
        <div className='text-right'>
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
    </div>
  )
}

export default WaitForDriver
