import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useCaptain } from '../context/CaptainContext.jsx'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainSignup = () => {

  const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlat, setVehiclePlat] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [captainData, setCaptainData] = useState({});


    const { captain , setCaptain } = useCaptain();
  
    const handleSubmit = async(e) => {
      e.preventDefault();
  
      const newUserData = {
        fullname: {
          firstname: firstName,
          lastname: lastName,
        },
        email: email,
        password: password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlat,
          capacity: Number(vehicleCapacity),
          vehicleType: vehicleType,
        },
      };

      setCaptainData(newUserData);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/captains/register`,
          newUserData,
          { withCredentials: true }
        );

        if (response.status === 201) {
          const data = response.data;
          setCaptain(data.captain);
          navigate('/captain-home');
        }
      } catch (err) {
        console.error('Captain signup error:', err?.response?.data || err.message);
        if (err?.response?.data?.errors) {
          const messages = err.response.data.errors.map(e => e.msg).join('\n');
          alert(messages);
        } else if (err?.response?.data?.message) {
          alert(err.response.data.message);
        } else {
          alert('Signup failed');
        }
      }
      
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setVehicleColor('');
      setVehiclePlat('');
      setVehicleCapacity('');
      setVehicleType('');
    }

  return (
     <div className="h-screen p-7 flex flex-col justify-between">
      <div>
        <img
          className="w-16 ml-6 mb-15 mt-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl mb-2 font-medium">What's your name?</h3>
          <div className='flex gap-2'>
            <input
            className="bg-[#eeeeee] w-1/2 mb-5 rounded px-4 py-2 border  text-lg placeholder:text-sm"
            required
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value)
            }}
            type="text"
            placeholder="First Name"
          />
          <input
            className="bg-[#eeeeee] w-1/2 mb-5 rounded px-4 py-2 border text-lg placeholder:text-sm"
            required
            value={lastName}
            onChange={(e)=>{
              setLastName(e.target.value)
            }}
            type="text"
            placeholder="Last Name"
          />

          </div>
          <h3 className="text-xl mb-2 font-medium">What's your email?</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
            required
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-xl mb-2 font-medium">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
            required
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            type="password"
            placeholder="password"
          />

          <h3 className="text-xl mb-2 font-medium">Vehicle details</h3>
          <div className="flex flex-col gap-4 mb-5">
            <div className="flex gap-2">
              <input
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-sm"
                required
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                type="text"
                placeholder="Vehicle Color"
              />
              <input
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-sm"
                required
                value={vehiclePlat}
                onChange={(e) => setVehiclePlat(e.target.value)}
                type="text"
                placeholder="Vehicle Plate"
              />
            </div>
            <div className="flex gap-2">
              <input
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-sm"
                required
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                type="number"
                min="1"
                placeholder="Capacity"
              />
              <select
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg"
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="">Select vehicle type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="motorcycle">Motorcycle</option>
              </select>
            </div>
          </div>

          <button type="submit" className="font-bold text-lg bg-black text-white mt-5 w-full py-4 px-4 rounded hover:bg-gray-800">
            Create Captain Account
          </button>
        </form>
        
        <p className="text-center mt-3 text-lg font-medium">
          Already have a account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Sign In
          </Link>{" "}
        </p>
      </div>

      <div>
        <p className='text-xs leading-5'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and Terms of Service apply.</p>
      </div>
    </div>
  )
}

export default CaptainSignup
