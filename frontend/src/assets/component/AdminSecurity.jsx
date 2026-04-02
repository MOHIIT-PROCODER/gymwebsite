import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminSecurity() {

  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const verifyAdmin = () => {

    if (code === "admin123") {

      localStorage.setItem("adminVerified", "true");

      alert("Security Verified");

      navigate("/admin");

    } else {

      alert("Wrong Security Code");

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      <div className="bg-gray-900 p-10 rounded-xl shadow-lg shadow-red-500/20 w-96 text-center border border-gray-800">

        <h2 className="text-3xl font-bold text-white mb-6">
          Admin Security Check
        </h2>

        <input
          type="password"
          placeholder="Enter Security Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
        />

        <button
          onClick={verifyAdmin}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 transition px-4 py-3 rounded-lg text-white font-semibold shadow-lg shadow-red-600/30"
        >
          Verify
        </button>

      </div>

    </div>
  );
}

export default AdminSecurity;