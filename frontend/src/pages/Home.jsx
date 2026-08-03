import React, { useContext, useRef, useState } from 'react'
import axios from 'axios';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitForDriver from '../components/WaitForDriver';
import SocketContext from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';


const Home = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [panelopen, setPanelopen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [suggestionError, setSuggestionError] = useState('');
  const [fare, setFare] = useState({
    auto: null,
    car: null,
    motorcycle: null,
  });
  const [fareLoading, setFareLoading] = useState(false);
  const debounceTimerRef = useRef(null);
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
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [selectedVehicleFare, setSelectedVehicleFare] = useState(null);
  const { socket, isConnected, sendMessage } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useGSAP(function() {
    if (!isConnected || !socket?.connected || !user?.id) {
      return;
    }

    sendMessage('join', { userType: 'user', userId: user.id });
  }, [isConnected, socket, user?.id])

  const submitHandler = (e)=>{
    e.preventDefault();
  }

  const fetchSuggestions = async (input, field) => {
    const trimmedValue = input.trim();

    if (!trimmedValue) {
      setSuggestions([]);
      setSuggestionError('');
      return;
    }

    if (trimmedValue.length < 3) {
      setSuggestions([]);
      return;
    }

    setActiveField(field);
    setIsLoadingSuggestions(true);
    setSuggestionError('');

    try {
      const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';
      const response = await axios.get(`${baseUrl}/maps/auto-suggestion`, {
        params: { input: trimmedValue },
        withCredentials: true,
      });

      setSuggestions(response.data || []);
    } catch (error) {
      console.error('Unable to fetch suggestions', error);
      setSuggestions([]);
      setSuggestionError('Unable to load suggestions right now.');
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleLocationInput = (event, field) => {
    const value = event.target.value;

    if (field === 'pickup') {
      setPickupLocation(value);
    } else {
      setDestination(value);
    }

    setPanelopen(true);
    setActiveField(field);

    // Debounce suggestion fetching
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      fetchSuggestions(value, field);
    }, 500);
  };

  const handleSuggestionSelect = (description, field) => {
    if (field === 'pickup') {
      setPickupLocation(description);
    } else {
      setDestination(description);
    }

    setPanelopen(false);
    setSuggestions([]);
    setSuggestionError('');
  };

  const fetchFares = async (pickup, destination) => {
    if (!pickup || !destination || pickup.length < 3 || destination.length < 3) {
      console.warn('Invalid pickup or destination');
      return;
    }

    setFareLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';
      const vehicleTypes = ['auto', 'car', 'motorcycle'];
      const fareData = {};

      for (const vehicleType of vehicleTypes) {
        try {
          const response = await axios.get(`${baseUrl}/rides/get-fare`, {
            params: { pickup, destination, vehicleType },
            withCredentials: true,
          });
          fareData[vehicleType] = response.data.fare;
        } catch (error) {
          console.error(`Failed to fetch fare for ${vehicleType}`, error);
          fareData[vehicleType] = null;
        }
      }

      setFare(fareData);
    } catch (error) {
      console.error('Error fetching fares', error);
      setFare({ auto: null, car: null, motorcycle: null });
    } finally {
      setFareLoading(false);
    }
  };


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
              setActiveField('pickup')
              setPanelopen(true)
            }}
            onChange={(e)=>handleLocationInput(e, 'pickup')}
            type="text" placeholder="add pickup location" />

            <input className='bg-[#eee] px-8 py-2 text-lg rounded-lg mt-4 w-full' 
            value={destination}
            onClick={()=>{
              setActiveField('destination')
              setPanelopen(true)
            }}
            onChange={(e)=>handleLocationInput(e, 'destination')}
            type="text" placeholder="add a destination" />
          </form>

          <button
            onClick={() => {
              setPanelopen(false);
              fetchFares(pickupLocation, destination);
              setVehiclePanelOpen(true);
            }}
            className='bg-black text-white border-2 rounded-xl font-semibold p-3 text-center w-full mt-5'
          >
            Find Trip
          </button>
          </div>

          <div ref={panelRef} className='h-0 bg-white '>
              <LocationSearchPanel
                setPanelopen={setPanelopen}
                suggestions={suggestions}
                activeField={activeField}
                isLoading={isLoadingSuggestions}
                error={suggestionError}
                onSelectSuggestion={handleSuggestionSelect}
              />
          </div>
        </div>

            // Choose a vehicle panel
        <div ref={vehiclePanelRef} className='w-full fixed z-10 bottom-0 translate-y-full px-3 py-6 bg-white'>
            <VehiclePanel 
              setConfirmRidePanel={setConfirmRidePanel} 
              setVehicleFound={setVehicleFound} 
              setVehiclePanelOpen={setVehiclePanelOpen}
              fare={fare}
              fareLoading={fareLoading}
              pickupLocation={pickupLocation}
              destination={destination}
              setSelectedVehicleType={setSelectedVehicleType}
              setSelectedVehicleFare={setSelectedVehicleFare}
            />
        </div>    


            //confirm ride panel
         <div ref={confirmRidePanelRef} className='w-full fixed z-10 bottom-0 translate-y-full px-3 py-6 bg-white'>
           <ConfirmRide 
             setConfirmRidePanel={setConfirmRidePanel} 
             setVehicleFound={setVehicleFound}
             pickupLocation={pickupLocation}
             destination={destination}
             selectedVehicleType={selectedVehicleType}
             selectedVehicleFare={selectedVehicleFare}
           />
        </div> 


        <div ref={vehicleFoundRef} className='w-full fixed z-10 bottom-0 translate-y-full px-3 py-6 bg-white'>
            <LookingForDriver setVehicleFound={setVehicleFound}
            setConfirmRidePanel={setConfirmRidePanel} 
             setVehicleFound={setVehicleFound}
             pickupLocation={pickupLocation}
             destination={destination}
             selectedVehicleType={selectedVehicleType}
             selectedVehicleFare={selectedVehicleFare}
            />
        </div>
        
        <div ref={waitForDriverRef} className='w-full fixed z-10 bottom-0 translate-y-full px-3 py-6 bg-white'>
            <WaitForDriver setWaitForDriver={setWaitForDriver} setVehiclePanelOpen={setVehiclePanelOpen}/>
        </div>

    </div>
  )
}

export default Home
