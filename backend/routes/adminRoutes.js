const express = require("express");
const router = express.Router();

const Payment = require("../models/Payment");
const User = require("../models/User");

// ===============================
// ADMIN ADD MEMBER (CASH PAYMENT)
// ===============================
router.post("/add-member", async (req, res) => {
  try {

    const { name, phone, email, planName, planType, amount } = req.body;

    // VALIDATION
    if (!name || !phone || !email || !planName || !planType || !amount) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // PLAN MONTHS
    let months = 1;

    if (planType === "Yearly") {
      months = 12;
    }

    const startDate = new Date();

    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + months);

    // CHECK IF USER EXISTS
    let user = await User.findOne({ email });

    if (!user) {

      user = new User({
        name,
        phone,
        email,
        planName,
        planType,
        startDate,
        expiryDate
      });

      await user.save();

    } else {

      // UPDATE PLAN IF USER EXISTS
      user.planName = planName;
      user.planType = planType;
      user.startDate = startDate;
      user.expiryDate = expiryDate;

      await user.save();
    }

    // CREATE PAYMENT ENTRY
    const payment = new Payment({
      userId: user._id,
      name,
      phone,
      email,
      planName,
      planType,
      amount,
      paymentId: "CASH-" + Date.now(),
      startDate,
      expiryDate
    });

    await payment.save();

    res.status(201).json({
      success: true,
      message: "Member added successfully",
      user,
      payment
    });

  } catch (error) {

    console.log("ADD MEMBER ERROR:", error);

    res.status(500).json({
      message: "Server error while adding member"
    });
  }
});


// ===============================
// GET ALL PAYMENTS
// ===============================
router.get("/payments", async (req, res) => {
  try {

    const payments = await Payment.find()
      .populate("userId", "name phone email")
      .sort({ createdAt: -1 });

    res.status(200).json(payments);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error fetching payments"
    });
  }
});


// ===============================
// ADMIN DASHBOARD STATS
// ===============================
router.get("/stats", async (req, res) => {
  try {

    const totalMembers = await User.countDocuments();

    const today = new Date();

    const activeMembers = await User.countDocuments({
      expiryDate: { $gt: today }
    });

    const expiredMembers = await User.countDocuments({
      expiryDate: { $lte: today }
    });

    const payments = await Payment.find();

    const totalRevenue = payments.reduce((sum, p) => {
      return sum + (p.amount || 0);
    }, 0);

    res.json({
      totalMembers,
      activeMembers,
      expiredMembers,
      totalRevenue
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch stats"
    });
  }
});

module.exports = router;