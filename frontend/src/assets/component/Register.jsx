import React, { useState } from "react";
import axios from "axios";

function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [password,setPassword] = useState("");
  const [address,setAddress] = useState("");
  const [bloodGroup,setBloodGroup] = useState("");

  const registerUser = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          phone,
          password,
          address,
          bloodGroup
        }
      );

      alert("Registration Successful");

    } catch (err) {

      alert("Registration Failed");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] px-4">

      <div className="bg-[#1a1a1a] p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-800">

        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Create <span className="text-red-600">Account</span>
        </h2>

        <p className="text-gray-400 text-center mb-8">
          Join Fitips and start your fitness journey.
        </p>

        <div className="space-y-4">

          <input
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-[#0d0d0d] border border-gray-700 text-white focus:outline-none focus:border-red-600"
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-[#0d0d0d] border border-gray-700 text-white focus:outline-none focus:border-red-600"
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            placeholder="Phone"
            className="w-full p-3 rounded-lg bg-[#0d0d0d] border border-gray-700 text-white focus:outline-none focus:border-red-600"
            onChange={(e)=>setPhone(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-[#0d0d0d] border border-gray-700 text-white focus:outline-none focus:border-red-600"
            onChange={(e)=>setPassword(e.target.value)}
          />

          {/* ADDRESS */}
          <input
            placeholder="Address"
            className="w-full p-3 rounded-lg bg-[#0d0d0d] border border-gray-700 text-white focus:outline-none focus:border-red-600"
            onChange={(e)=>setAddress(e.target.value)}
          />

          {/* BLOOD GROUP */}
          <select
            className="w-full p-3 rounded-lg bg-[#0d0d0d] border border-gray-700 text-white focus:outline-none focus:border-red-600"
            onChange={(e)=>setBloodGroup(e.target.value)}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

        </div>

        <button
          onClick={registerUser}
          className="w-full mt-6 bg-red-600 hover:bg-red-700 transition duration-300 text-white font-semibold py-3 rounded-lg"
        >
          Register
        </button>

        <p className="text-gray-400 text-center mt-6 text-sm">
          Already have an account? 
          <span className="text-red-600 cursor-pointer ml-1">
            Login
          </span>
        </p>

      </div>

    </div>

  );

}

export default Register;