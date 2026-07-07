import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
      <h5 onClick={()=>{props.setVehiclePanelOpen(false)}} className='cursor-pointer p-3 text-center w-[90%]  absolute top-0'><i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
            <div onClick={()=>{props.setConfirmRidePanel(true)}} className='flex border-2 mb-2 border-black  rounded-xl w-full p-3 items-center justify-between'>
              <img className='h-12' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7zy6GeYezGhl4-rKsmJWNa1-3FkVaTF2UvlBPRWVf5w&s=10" alt="" />
              <div className='ml-2 w-1/2'>
                <h4 className='text-base font-medium'>UberGo <span><i className="ri-user-fill"></i>4</span></h4>
                <h5 className='text-sm font-medium'>2 min away</h5>
                <p className='text-xs font-medium text-gray-600 '>affordable compact rides</p>
              </div>
              <h2 className='text-xl font-bold'>$2.50</h2>
            </div>

            <div onClick={()=>{props.setConfirmRidePanel(true)}} className='flex border-2 mb-2 border-black  rounded-xl w-full p-3 items-center justify-between'>
              <img className='h-12' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n" alt="" />
              <div className='ml-2 w-1/2'>
                <h4 className='text-base font-medium'>UberBike <span><i className="ri-user-fill"></i>1</span></h4>
                <h5 className='text-sm font-medium'>3 min away</h5>
                <p className='text-xs font-medium text-gray-600 '>affordable Moto rides</p>
              </div>
              <h2 className='text-xl font-bold'>$1.50</h2>
            </div>

            <div onClick={()=>{props.setConfirmRidePanel(true)}} className='flex border-2 mb-2 border-black  rounded-xl w-full p-3 items-center justify-between'>
              <img className='h-12' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mYzEwMWZmOC04MWExLTQ2YzMtOTk1YS02N2I0YmJkMmYyYmYuanBn" alt="" />
              <div className='ml-2 w-1/2'>
                <h4 className='text-base font-medium'>UberAuto <span><i className="ri-user-fill"></i>6</span></h4>
                <h5 className='text-sm font-medium'>5 min away</h5>
                <p className='text-xs font-medium text-gray-600 '>affordable Auto rides</p>
              </div>
              <h2 className='text-xl font-bold'>$0.50</h2>
            </div>
    </div>
  )
}

export default VehiclePanel
