import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();

const loginUser = async () => {

if (!email || !password) {
alert("Please enter email and password");
return;
}

try {

const res = await axios.post(
"http://localhost:5000/api/auth/login",
{
email,
password
}
);

console.log("Login Response:", res.data);

const user = res.data.user;

// save user
localStorage.setItem("user", JSON.stringify(user));

alert("Login Successful");

// check role safely
if (user && user.role === "admin") {

navigate("/admin-security");

} else {

navigate("/dashboard");

}

} catch (error) {

console.log("Login error:", error);

alert(error.response?.data?.message || "Login Failed");

}

};

return (

<div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] px-4">

<div className="bg-[#1a1a1a] p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-800">

<h2 className="text-3xl font-bold text-white text-center mb-6">
Welcome <span className="text-red-600">Back</span>
</h2>

<p className="text-gray-400 text-center mb-8">
Login to continue your fitness journey.
</p>

<div className="space-y-4">

<input
type="text"
placeholder="Email"
value={email}
className="w-full p-3 rounded-lg bg-[#0d0d0d] border border-gray-700 text-white focus:outline-none focus:border-red-600"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
className="w-full p-3 rounded-lg bg-[#0d0d0d] border border-gray-700 text-white focus:outline-none focus:border-red-600"
onChange={(e)=>setPassword(e.target.value)}
/>

</div>

<button
onClick={loginUser}
className="w-full mt-6 bg-red-600 hover:bg-red-700 transition duration-300 text-white font-semibold py-3 rounded-lg"
>
Login
</button>

<p className="text-gray-400 text-center mt-6 text-sm">
Don't have an account?
<span className="text-red-600 cursor-pointer ml-1">
Register
</span>
</p>

</div>

</div>

);

}

export default Login;