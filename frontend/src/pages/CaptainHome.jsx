import React, { useEffect,useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetail from '../components/CaptainDetail'
import RidePopUp from '../components/RidePopUp'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import SocketContext from '../context/SocketContext'
import CaptainContext from '../context/CaptainContext'

const CaptainHome = () => {

  const [ridePopUpPanel, setRidePopUpPanel] = useState(true);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);

  const ridePopUpRef = useRef(null);
  const confirmRidePopUpRef = useRef(null);

  const { captain } = useContext(CaptainContext);
  const {socket, isConnected, sendMessage} = useContext(SocketContext);

  useEffect(() => {
    socket?.emit('join', { userType: 'captain', userId: captain?.id });
  }, []);

  
  useGSAP(function() {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpRef.current,{
      transform:'translateY(0)',
    })
    }else{
        gsap.to(ridePopUpRef.current,{
      transform:'translateY(100%)',
    })
    }
  },[ridePopUpPanel])

  useGSAP(function() {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpRef.current,{
      transform:'translateY(0)',
    })
    }else{
        gsap.to(confirmRidePopUpRef.current,{
      transform:'translateY(100%)',
    })
    }
  },[confirmRidePopUpPanel])

  return (
      <div className='h-screen'>

        <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
         <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />

          <Link to='/home' className=' m-3 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
        </div>

      <div className ="h-3/5 w-screen">
          <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"  alt=''/>
      </div>

      <div className='h-2/5 p-6'>
        <CaptainDetail/>
      </div>

        <div ref={ridePopUpRef} className='w-full fixed z-10 bottom-0 translate-y-full  px-3 py-6 bg-white'>
            <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
        </div> 

         <div ref={confirmRidePopUpRef} className='w-full h-screen fixed z-10 bottom-0 translate-y-full  px-3 py-6 bg-white'>
            <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}/>
        </div> 

    </div>
  )
}

export default CaptainHome
