import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetail from '../components/CaptainDetail'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import FinishRide from '../components/FinishRide';

const CaptainRiding = () => {

    const [finishPanel, setFinishPanel] = useState(false);
    const finishPanelRef = useRef(null);
    
    useGSAP(function() {
    if (finishPanel) {
      gsap.to(finishPanelRef.current,{
      transform:'translateY(0)',
    })
    }else{
        gsap.to(finishPanelRef.current,{
      transform:'translateY(100%)',
    })
    }
  },[finishPanel])

  return (
    <div className='h-screen '>
        
        <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
         <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />

          <Link to='/captain-home' className=' m-3 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
        </div>

      <div className ="h-4/5 w-screen">
          <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"  alt=''/>
      </div>

      <div onClick={()=>{
        setFinishPanel(true)
      }} className='m-1 rounded h-1/5 p-6 flex items-center relative justify-between bg-yellow-400'>
        <h5
        className="cursor-pointer p-3 text-center w-[90%] absolute  top-0"
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i>
      </h5>
        <h4 className='text-xl font-semibold'>4 KM Away</h4>
        <button className="mr-2  bg-green-600 text-white font-semibold p-3 px-8 rounded-lg">
          Complete Ride{" "}
        </button>
      </div>

    <div ref={finishPanelRef} className='w-full h-screen fixed z-10 bottom-0 translate-y-full  px-3 py-6 bg-white'>
        <FinishRide setFinishPanel={setFinishPanel}/>
        </div>

    </div>
  )
}

export default CaptainRiding
