
import React from "react";

function UserDashboard(){

 const user = JSON.parse(localStorage.getItem("user"));

 const today = new Date();
 const expiry = user?.expiryDate ? new Date(user.expiryDate) : null;

 const daysRemaining =
  expiry ? Math.ceil((expiry - today)/(1000*60*60*24)) : null;

 // Temporary Trainer Data (later fetch from API)
 const trainer = {
  name: "Rahul Sharma",
  specialization: "Weight Training",
  phone: "9876543210"
 };

 return(

 <div className="min-h-screen bg-[#0d0d0d] text-white p-6 md:p-10">

 {/* HEADER */}
 <div className="flex items-center gap-6 mb-10">

  <img
   src={
    user?.profileImage ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
   }
   alt="profile"
   className="w-20 h-20 rounded-full border-2 border-red-600 object-cover"
  />

  <h1 className="text-3xl md:text-4xl font-bold">
   Welcome, <span className="text-red-600">{user?.name}</span>
  </h1>

 </div>


 {/* MAIN GRID */}
 <div className="grid md:grid-cols-2 gap-8">

  {/* PERSONAL INFO */}
  <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-gray-800 shadow-lg">

   <h2 className="text-xl font-semibold mb-6 text-red-600">
    Personal Information
   </h2>

   <div className="space-y-3 text-gray-300">

    <p><span className="text-white font-semibold">Name:</span> {user?.name}</p>

    <p><span className="text-white font-semibold">Email:</span> {user?.email}</p>

    <p><span className="text-white font-semibold">Phone:</span> {user?.phone}</p>

    <p><span className="text-white font-semibold">Address:</span> {user?.address || "Not Added"}</p>

    <p><span className="text-white font-semibold">Blood Group:</span> {user?.bloodGroup || "Not Added"}</p>

    <p><span className="text-white font-semibold">Age:</span> {user?.age || "Not Added"}</p>

    <p><span className="text-white font-semibold">Height:</span> {user?.height ? `${user.height} cm` : "Not Added"}</p>

    <p><span className="text-white font-semibold">Weight:</span> {user?.weight ? `${user.weight} kg` : "Not Added"}</p>

   </div>

  </div>


  {/* MEMBERSHIP INFO */}
  <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-gray-800 shadow-lg">

   <h2 className="text-xl font-semibold mb-6 text-red-600">
    Membership Details
   </h2>

   <div className="space-y-3 text-gray-300">

    <p>
     <span className="text-white font-semibold">Plan Name:</span>
     {" "}{user?.planName || "No Plan"}
    </p>

    <p>
     <span className="text-white font-semibold">Plan Type:</span>
     {" "}{user?.planType || "N/A"}
    </p>

    <p>
     <span className="text-white font-semibold">Start Date:</span>
     {" "}
     {user?.startDate
      ? new Date(user.startDate).toLocaleDateString()
      : "N/A"}
    </p>

    <p>
     <span className="text-white font-semibold">Expiry Date:</span>
     {" "}
     {user?.expiryDate
      ? new Date(user.expiryDate).toLocaleDateString()
      : "N/A"}
    </p>

    <p>
     <span className="text-white font-semibold">Days Remaining:</span>
     {" "}
     {daysRemaining !== null
      ? daysRemaining > 0
       ? daysRemaining
       : "Expired"
      : "N/A"}
    </p>

    <p>
     <span className="text-white font-semibold">Membership Status:</span>
     {" "}
     <span
      className={
       user?.membershipStatus === "Active"
        ? "text-green-500"
        : "text-red-500"
      }
     >
      {user?.membershipStatus}
     </span>
    </p>

    <p>
     <span className="text-white font-semibold">Payment Status:</span>
     {" "}
     <span
      className={
       user?.paymentStatus === "Success"
        ? "text-green-500"
        : "text-yellow-400"
      }
     >
      {user?.paymentStatus}
     </span>
    </p>

   </div>

  </div>

 </div>


 {/* TRAINER SECTION */}
 <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-gray-800 shadow-lg mt-10">

  <h2 className="text-xl font-semibold mb-6 text-red-600">
   Trainer Information
  </h2>

  <p className="text-gray-300">
   <span className="text-white font-semibold">Name:</span> {trainer.name}
  </p>

  <p className="text-gray-300">
   <span className="text-white font-semibold">Specialization:</span> {trainer.specialization}
  </p>

  <p className="text-gray-300">
   <span className="text-white font-semibold">Contact:</span> {trainer.phone}
  </p>

 </div>


 {/* PAYMENT HISTORY PLACEHOLDER */}
 <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-gray-800 shadow-lg mt-10">

  <h2 className="text-xl font-semibold mb-6 text-red-600">
   Payment History
  </h2>

  <p className="text-gray-400">
   Payment records will appear here.
  </p>

 </div>


 </div>

 );

}

export default UserDashboard;

