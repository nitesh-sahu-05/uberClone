import React, { useRef, useState } from 'react'
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';

const Home = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [panelopen, setPanelopen] = useState(false);
  const vehiclePanelRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);

  const submitHandler = (e)=>{
    e.preventDefault();
  }

  useGSAP(function() {
    if (panelopen) {
      gsap.to(panelRef.current,{
      height:'70%',
      // opacity:1
    })
    gsap.to(panelCloseRef.current,{
      opacity:1
    })
    }else{
        gsap.to(panelRef.current,{
      height:'0%',
      // opacity:0
    })
    gsap.to(panelCloseRef.current,{
      opacity:0
    })
    }
  },[panelopen])

  useGSAP(function() {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current,{
      transform:'translateY(0)',
    })
    }else{
        gsap.to(vehiclePanelRef.current,{
      transform:'translateY(100%)',
    })
    }
  },[vehiclePanelOpen])
  return (
    <div className='h-screen relative overflow-hidden'>
        <img
          className="w-16 ml-6 mb-15 mt-5 absolute"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />

        <div className ="h-screen w-screen">
          <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"  alt=''/>
        </div>

        <div className='flex flex-col justify-end absolute top-0  h-screen w-full'>
          <div className='h-[30%] p-5 bg-white relative'>
            <h5 ref={panelCloseRef}
            onClick={()=>{
              setPanelopen(false)
            }}
            className='absolute opacity-0 right-6 top-6 text-2xl'>
              <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h4 className='text-2xl font-semibold'>find a Trip</h4>
          <form onSubmit={(e)=>{
            submitHandler(e)
          }}>
            <input className='bg-[#eee] px-8 py-2 text-lg rounded-lg mt-4 w-full' 
            value={pickupLocation}
            onClick={()=>{
              setPanelopen(true)
            }}
            onChange={(e)=>{
              setPickupLocation(e.target.value)
            }}
            type="text" placeholder="add pickup location" />

            <input className='bg-[#eee] px-8 py-2 text-lg rounded-lg mt-4 w-full' 
            value={destination}
            onClick={()=>{
              setPanelopen(true)
            }}
            onChange={(e)=>{
              setDestination(e.target.value)
            }}
            type="text" placeholder="add a destination" />
          </form>
          </div>

          <div ref={panelRef} className='h-0 bg-white '>
              <LocationSearchPanel  setPanelopen={setPanelopen}  setVehiclePanel={setVehiclePanelOpen} />
          </div>
        </div>

            // Choose a vehicle panel
        <div ref={vehiclePanelRef} className='w-full fixed z-10 bottom-0 translate-y-full px-3 py-6 bg-white'>
            <h5 onClick={()=>{setVehiclePanelOpen(false)}} className='cursor-pointer p-3 text-center w-[90%]  absolute top-0'><i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
            <div className='flex border-2 mb-2 border-black  rounded-xl w-full p-3 items-center justify-between'>
              <img className='h-12' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7zy6GeYezGhl4-rKsmJWNa1-3FkVaTF2UvlBPRWVf5w&s=10" alt="" />
              <div className='ml-2 w-1/2'>
                <h4 className='text-base font-medium'>UberGo <span><i className="ri-user-fill"></i>4</span></h4>
                <h5 className='text-sm font-medium'>2 min away</h5>
                <p className='text-xs font-medium text-gray-600 '>affordable compact rides</p>
              </div>
              <h2 className='text-xl font-bold'>$2.50</h2>
            </div>

            <div className='flex border-2 mb-2 border-black  rounded-xl w-full p-3 items-center justify-between'>
              <img className='h-12' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n" alt="" />
              <div className='ml-2 w-1/2'>
                <h4 className='text-base font-medium'>UberBike <span><i className="ri-user-fill"></i>1</span></h4>
                <h5 className='text-sm font-medium'>3 min away</h5>
                <p className='text-xs font-medium text-gray-600 '>affordable Moto rides</p>
              </div>
              <h2 className='text-xl font-bold'>$1.50</h2>
            </div>

            <div className='flex border-2 mb-2 border-black  rounded-xl w-full p-3 items-center justify-between'>
              <img className='h-12' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mYzEwMWZmOC04MWExLTQ2YzMtOTk1YS02N2I0YmJkMmYyYmYuanBn" alt="" />
              <div className='ml-2 w-1/2'>
                <h4 className='text-base font-medium'>UberAuto <span><i className="ri-user-fill"></i>6</span></h4>
                <h5 className='text-sm font-medium'>5 min away</h5>
                <p className='text-xs font-medium text-gray-600 '>affordable Auto rides</p>
              </div>
              <h2 className='text-xl font-bold'>$0.50</h2>
            </div>

        </div>    
        

    </div>
  )
}

export default Home
