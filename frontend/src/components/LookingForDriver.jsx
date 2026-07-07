import React from 'react'

const LookingForDriver = (props) => {
  return (
     <div>
      <h5
        onClick={() => {
          props.setVehicleFound(false);
        }}
        className="cursor-pointer p-3 text-center w-[90%]  absolute top-0"
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-semibold mt-4 mb-5">Looking for a driver...</h3>

      <div className="flex gap-2 flex-col justify-between items-center">
        <img
          className="h-20"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7zy6GeYezGhl4-rKsmJWNa1-3FkVaTF2UvlBPRWVf5w&s=10"
          alt="Ride Image"
        />
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

export default LookingForDriver
