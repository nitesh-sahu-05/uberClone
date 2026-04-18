import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const UserSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userData, setUserData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUserData = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    };

    setUserData(newUserData);
    console.log(newUserData);

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
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
          <button type="submit" className="font-bold text-lg bg-black text-white mt-5 w-full py-4 px-4 rounded hover:bg-gray-800">
            Sign Up
          </button>
        </form>
        
        <p className="text-center mt-3 text-lg font-medium">
          Already have a account?{" "}
          <Link to="/login" className="text-blue-600">
            Sign In
          </Link>{" "}
        </p>
      </div>

      <div>
        <p className='text-xs leading-5'>By proceding, yow concent to get calls, Whatsapp or email including by automated means,from Uber and its affiliated to the number provided </p>
      </div>
    </div>
  )
}

export default UserSignUp
