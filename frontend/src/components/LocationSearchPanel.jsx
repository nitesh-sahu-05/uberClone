import React from 'react'

const LocationSearchPanel = (props) => {
console.log(props)
  const locations = [
    "kokdi durg chattisgarh",
    "durg chattisgarh",
    "raipur chattisgarh",
    "bhilai chattisgarh",
  ]

  return (
    <div>

      {locations.map((elem,idx)=>{
        return <div key={idx} onClick={()=>{
          props.setVehiclePanel(true)
          props.setPanelopen(false)
        }} className='flex items-center border-2 border-gray-100 active:border-black p-3  rounded justify-start my-2 gap-3'>
        <h2 className='bg-[#eee] h-8 flex items-center justify-center ml-5 w-10 rounded-full'><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medium'>{elem}</h4>
      </div>
      })}


      
    </div>
  )
}

export default LocationSearchPanel
