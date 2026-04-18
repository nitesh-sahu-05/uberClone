import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserData = ({
      email: email,
      password: password
    })
    setUserData(newUserData);
    console.log(newUserData);
    setEmail('');
    setPassword('');
  };


  return (
    <div className="h-screen p-7 flex flex-col justify-between">
      <div>
        <img
          className="w-16 ml-6 mb-15 mt-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl mb-2 font-medium">What's your email?</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-xl mb-2 font-medium">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="password"
          />
          <button type="submit" className="font-bold text-lg bg-black text-white mt-5 w-full py-4 px-4 rounded hover:bg-gray-800">
            Login
          </button>
        </form>
        
        <p className="text-center mt-3 text-lg font-medium">
          New here?{" "}
          <Link to="/signup" className="text-blue-600">
            Create New Account
          </Link>{" "}
        </p>
      </div>

      <div>
        <Link to="/captain-login" className="bg-[#f5f502] flex items-center justify-center font-bold text-xl text-black mt-5 w-full py-4 px-4 rounded hover:bg-gray-500 cursor-pointer">
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
