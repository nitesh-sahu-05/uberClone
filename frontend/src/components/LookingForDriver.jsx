import React from 'react'

const LookingForDriver = (props) => {
    const vehicleMap = {
    car: {
      name: 'UberGo',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7zy6GeYezGhl4-rKsmJWNa1-3FkVaTF2UvlBPRWVf5w&s=10',
    },
    motorcycle: {
      name: 'UberBike',
      image: 'https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n',
    },
    auto: {
      name: 'UberAuto',
      image: 'https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mYzEwMWZmOC04MWExLTQ2YzMtOTk1YS02N2I0YmJkMmYyYmYuanBn',
    },
  };

  const selectedVehicle = props.selectedVehicleType ? vehicleMap[props.selectedVehicleType] : null;

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

       <div>
      <h5
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
        className="cursor-pointer p-3 text-center w-[90%]  absolute top-0"
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i>
      </h5>

      <div className="flex gap-2 flex-col justify-between items-center">
        <img
          className="h-20"
          src={selectedVehicle?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7zy6GeYezGhl4-rKsmJWNa1-3FkVaTF2UvlBPRWVf5w&s=10"}
          alt={selectedVehicle?.name || "Ride Image"}
        />
        <h2 className="text-xl font-bold">{selectedVehicle?.name || 'Select a vehicle'}</h2>
        <div className="w-full mt-5 ">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-2-fill text-lg"></i>
            <div>
              <h3 className="font-medium text-lg">Pickup</h3>
              <p className="text-gray-600">{props.pickupLocation || 'Pickup location'}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-2-fill text-lg"></i>
            <div>
              <h3 className="font-medium text-lg">Destination</h3>
              <p className="text-gray-600">{props.destination || 'Destination location'}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 ">
            <i className="ri-money-dollar-box-line text-lg"></i>
            <div>
              <h3 className="font-medium text-lg">₹{props.selectedVehicleFare || '0'}</h3>
              <p className="text-gray-600">Cash Payment</p>
            </div>
          </div>
        </div>

        {/* <button onClick={()=>{props.setVehicleFound(true) ,props.setConfirmRidePanel(false)}} className="mt-5 w-full bg-green-600 text-white font-semibold p-2 rounded-lg">
          Confirm{" "}
        </button> */}
      </div>
    </div>
    </div>
  )
}

export default LookingForDriver
