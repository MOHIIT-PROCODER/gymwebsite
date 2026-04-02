import { Routes, Route } from "react-router-dom";
import Navbar from "./assets/component/Navbar";
import Home from "./assets/component/Home";
import Nutrition from "./assets/component/Nutrition";
import Workouts from "./assets/component/Workouts";
import Plans from "./assets/component/Plans";
import "./App.css";
import AdminDashboard from "./assets/component/AdminDashboard";
import Review from "./assets/component/Review";
import Login from "./assets/component/Login";
import Register from "./assets/component/Register";
import UserDashboard from "./assets/component/UserDashboard";
import AdminSecurity from "./assets/component/AdminSecurity";
import LearnMore from "./assets/component/LearnMore";
import DietPlans from "./assets/component/DietPlans";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="review" element={<Review />} />
        <Route path="/learnmore" element={<LearnMore />} />
        <Route path="/dietplans" element={<DietPlans />} />

        

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin-security" element={<AdminSecurity />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
