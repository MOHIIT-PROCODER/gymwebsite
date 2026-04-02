const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const path = require("path");

// Models
const User = require("./models/User");
const Admin = require("./models/Admin");

// Routes
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const planRoutes = require("./routes/plans");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/auth", authRoutes);

// 🔥 Serve frontend (IMPORTANT)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("MongoDB Connected");

    // Create default admin if not exists
    const adminExists = await Admin.findOne({ username: "admin" });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      await Admin.create({
        username: "admin",
        password: hashedPassword,
      });

      console.log("Default Admin Created");
    }
  })
  .catch((err) => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("Gym Management API Running");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});