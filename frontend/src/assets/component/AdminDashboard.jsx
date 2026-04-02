import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

const navigate = useNavigate();

const [payments,setPayments] = useState([]);

const [stats,setStats] = useState({
  totalMembers:0,
  activeMembers:0,
  expiredMembers:0,
  totalRevenue:0
});

const [showForm,setShowForm] = useState(false);

const [member,setMember] = useState({
name:"",
phone:"",
email:"",
bloodGroup:"",
planName:"Basic",
planType:"Monthly"
});


// 🔐 ADMIN SECURITY CHECK
useEffect(() => {

 const verified = localStorage.getItem("adminVerified");

 if (!verified) {
   navigate("/admin-security");
 }

 loadPayments();

}, [navigate]);


// LOAD PAYMENTS
const loadPayments = async () => {

 try{

 const res = await axios.get("http://localhost:5000/api/admin/payments");

 setPayments(res.data);

 let totalMembers = res.data.length;
 let activeMembers = 0;
 let expiredMembers = 0;
 let totalRevenue = 0;

 res.data.forEach(p => {

   const today = new Date();
   const expiry = new Date(p.expiryDate);

   if(expiry >= today){
     activeMembers++;
   }else{
     expiredMembers++;
   }

   totalRevenue += p.amount || 0;

 });

 setStats({
   totalMembers,
   activeMembers,
   expiredMembers,
   totalRevenue
 });

 }catch(err){
  console.log(err);
 }

};


// MEMBERSHIP STATUS
const getStatus = (expiryDate)=>{

 const today = new Date();
 const expiry = new Date(expiryDate);

 const diff = Math.ceil((expiry - today)/(1000*60*60*24));

 if(diff <=0) return "Expired";
 if(diff <=3) return "Expiring Soon";

 return "Active";

};


// INPUT CHANGE
const handleChange = (e)=>{

 setMember({
 ...member,
 [e.target.name]:e.target.value
 });

};


// ADD MEMBER
const addMember = async () => {

 try {

   if (!member.name || !member.phone || !member.email || !member.bloodGroup) {
     alert("Please fill all fields");
     return;
   }

   let amount = 0;

   if(member.planName === "Basic" && member.planType === "Monthly") amount = 999;
   if(member.planName === "Basic" && member.planType === "Yearly") amount = 9999;

   if(member.planName === "Pro" && member.planType === "Monthly") amount = 1499;
   if(member.planName === "Pro" && member.planType === "Yearly") amount = 14999;

   if(member.planName === "Elite" && member.planType === "Monthly") amount = 1999;
   if(member.planName === "Elite" && member.planType === "Yearly") amount = 19999;

   await axios.post(
     "http://localhost:5000/api/admin/add-member",
     {
       name: member.name,
       phone: member.phone,
       email: member.email,
       bloodGroup: member.bloodGroup,
       planName: member.planName,
       planType: member.planType,
       amount: amount
     }
   );

   alert("Member Added Successfully");

   setShowForm(false);

   setMember({
     name:"",
     phone:"",
     email:"",
     bloodGroup:"",
     planName:"Basic",
     planType:"Monthly"
   });

   loadPayments();

 } catch(err){

   console.log(err.response?.data || err.message);

   alert("Error adding member");

 }

};


return(

<div className="p-10 text-white bg-[#0d0d0d] min-h-screen">

<h1 className="text-3xl font-bold mb-8">
Admin Dashboard
</h1>


{/* STATS */}

<div className="grid md:grid-cols-4 gap-6 mb-10">

<div className="bg-[#1a1a1a] p-6 rounded-lg">
<h3>Total Members</h3>
<p className="text-2xl font-bold">{stats.totalMembers}</p>
</div>

<div className="bg-[#1a1a1a] p-6 rounded-lg">
<h3>Active Members</h3>
<p className="text-2xl font-bold">{stats.activeMembers}</p>
</div>

<div className="bg-[#1a1a1a] p-6 rounded-lg">
<h3>Expired Members</h3>
<p className="text-2xl font-bold">{stats.expiredMembers}</p>
</div>

<div className="bg-[#1a1a1a] p-6 rounded-lg">
<h3>Total Revenue</h3>
<p className="text-2xl font-bold">₹{stats.totalRevenue}</p>
</div>

</div>


{/* ADD MEMBER BUTTON */}

<button
className="bg-red-500 px-4 py-2 rounded mb-6"
onClick={()=>setShowForm(!showForm)}
>
Add Member
</button>


{/* ADD MEMBER FORM */}

{showForm &&(

<div className="bg-[#1a1a1a] p-6 rounded mb-8">

<h2 className="text-xl mb-4">
Add Member
</h2>

<div className="grid md:grid-cols-2 gap-4">

<input
type="text"
name="name"
placeholder="Name"
className="p-2 text-black rounded"
onChange={handleChange}
/>

<input
type="text"
name="phone"
placeholder="Phone"
className="p-2 text-black rounded"
onChange={handleChange}
/>

<input
type="email"
name="email"
placeholder="Email"
className="p-2 text-black rounded"
onChange={handleChange}
/>


{/* BLOOD GROUP */}

<select
name="bloodGroup"
className="p-2 text-black rounded"
onChange={handleChange}
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


<select
name="planName"
className="p-2 text-black rounded"
onChange={handleChange}
>

<option value="Basic">Basic</option>
<option value="Pro">Pro</option>
<option value="Elite">Elite</option>

</select>


<select
name="planType"
className="p-2 text-black rounded"
onChange={handleChange}
>

<option value="Monthly">Monthly</option>
<option value="Yearly">Yearly</option>

</select>

</div>

<button
className="bg-green-500 px-6 py-2 mt-4 rounded"
onClick={addMember}
>
Submit
</button>

</div>

)}


{/* PAYMENTS TABLE */}

<div className="bg-[#1a1a1a] p-6 rounded-lg overflow-x-auto">

<h2 className="text-xl mb-4">
Membership Payments
</h2>

<table className="w-full">

<thead className="bg-[#1f1f1f] text-gray-300">

<tr className="border-b border-gray-600">

<th className="p-3 text-left text-sm font-semibold text-blue-400">
Name
</th>

<th className="p-3 text-left text-sm font-semibold text-green-400">
Phone
</th>

<th className="p-3 text-left text-sm font-semibold text-red-400">
Blood
</th>

<th className="p-3 text-left text-sm font-semibold text-yellow-400">
Plan
</th>

<th className="p-3 text-left text-sm font-semibold text-purple-400">
Status
</th>

<th className="p-3 text-left text-sm font-semibold text-cyan-400">
Start
</th>

<th className="p-3 text-left text-sm font-semibold text-pink-400">
Expiry
</th>

</tr>

</thead>

<tbody>

{payments.map((p)=>{

const status = getStatus(p.expiryDate);

return(

<tr key={p._id} className="border-b border-gray-800 hover:bg-[#1f1f1f] transition">

<td className="p-3 text-blue-400 font-medium">
{p.name}
</td>

<td className="p-3 text-green-400">
{p.phone}
</td>

<td className="p-3 text-red-400 font-semibold">
{p.bloodGroup}
</td>

<td className="p-3 text-yellow-400">
{p.planName} ({p.planType})
</td>

<td className="p-3">

{status==="Active" && (
<span className="text-green-400 font-semibold">Active</span>
)}

{status==="Expiring Soon" && (
<span className="text-yellow-400 font-semibold">Expiring Soon</span>
)}

{status==="Expired" && (
<span className="text-red-400 font-semibold">Expired</span>
)}

</td>

<td className="p-3 text-cyan-400">
{new Date(p.startDate).toLocaleDateString()}
</td>

<td className="p-3 text-pink-400">
{new Date(p.expiryDate).toLocaleDateString()}
</td>

</tr>

);

})}

</tbody>

</table>

</div>

</div>

);

}

export default AdminDashboard;