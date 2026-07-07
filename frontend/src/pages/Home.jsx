import React, { useRef, useState } from 'react'
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitForDriver from '../components/WaitForDriver';

const Home = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [panelopen, setPanelopen] = useState(false);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitForDriverRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitForDriver, setWaitForDriver] = useState(false);
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

  useGSAP(function() {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current,{
      transform:'translateY(0)',
    })
    }else{
        gsap.to(confirmRidePanelRef.current,{
      transform:'translateY(100%)',
    })
    }
  },[confirmRidePanel])

  useGSAP(function() {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current,{
      transform:'translateY(0)',
    })
    }else{
        gsap.to(vehicleFoundRef.current,{
      transform:'translateY(100%)',
    })
    }
  },[vehicleFound])

   useGSAP(function() {
    if (waitForDriver) {
      gsap.to(waitForDriverRef.current,{
      transform:'translateY(0)',
    })
    }else{
        gsap.to(waitForDriverRef.current,{
      transform:'translateY(100%)',
    })
    }
  },[waitForDriver])

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
            <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>    


            //confirm ride panel
         <div ref={confirmRidePanelRef} className='w-full fixed z-10 bottom-0 translate-y-full px-3 py-6 bg-white'>
           <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>
        </div> 


        <div ref={vehicleFoundRef} className='w-full fixed z-10 bottom-0 translate-y-full px-3 py-6 bg-white'>
            <LookingForDriver setVehicleFound={setVehicleFound}/>
        </div>
        
        <div ref={waitForDriverRef} className='w-full fixed z-10 bottom-0 translate-y-full px-3 py-6 bg-white'>
            <WaitForDriver setWaitForDriver={setWaitForDriver} setVehiclePanelOpen={setVehiclePanelOpen}/>
        </div>

    </div>
  )
}

export default Home
