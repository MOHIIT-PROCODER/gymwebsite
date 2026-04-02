const Payment = require("../models/Payment");
const User = require("../models/User");
const Plan = require("../models/Plan");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "rzp_test_SNB6oJE0JEnxv2",
  key_secret: "bs7sGOpCINhHstdR4eRuVAes"
});


// =====================================
// CREATE RAZORPAY ORDER
// =====================================
exports.createOrder = async (req, res) => {

  try {

    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required"
      });
    }

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: "receipt_" + Date.now()
    });

    res.status(200).json({
      success: true,
      order
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: error.message
    });

  }

};



// =====================================
// SAVE ONLINE PAYMENT
// =====================================
exports.savePayment = async (req, res) => {

  try {

    const { name, phone, email, planId, paymentId } = req.body;

    if (!name || !phone || !email || !planId || !paymentId) {
      return res.status(400).json({
        success: false,
        message: "Missing payment data"
      });
    }

    // Prevent duplicate payments
    const existingPayment = await Payment.findOne({ paymentId });

    if (existingPayment) {
      return res.status(400).json({
        success: false,
        message: "Payment already recorded"
      });
    }

    const plan = await Plan.findById(planId);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found"
      });
    }

    const startDate = new Date();
    const expiryDate = new Date();

    expiryDate.setDate(expiryDate.getDate() + plan.duration);

    // Find or Create User
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        phone,
        email
      });
    }

    // Save payment
    const payment = await Payment.create({

      userId: user._id,
      name,
      phone,
      email,
      planId: plan._id,
      planName: plan.name,
      amount: plan.price,
      paymentId,
      method: "online",
      status: "Paid",
      startDate,
      expiryDate

    });

    // Update membership
    await User.findByIdAndUpdate(user._id, {

      planName: plan.name,
      startDate,
      expiryDate,
      membershipStatus: "Active",
      paymentStatus: "Success"

    });

    res.status(200).json({

      success: true,
      message: "Payment saved & membership activated",
      payment

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Saving payment failed",
      error: error.message
    });

  }

};



// =====================================
// ADMIN ADD MEMBER (CASH)
// =====================================
exports.addManualPayment = async (req, res) => {

  try {

    const { name, phone, email, planId, startDate } = req.body;

    if (!name || !phone || !email || !planId || !startDate) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const plan = await Plan.findById(planId);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found"
      });
    }

    const expiryDate = new Date(startDate);

    expiryDate.setDate(expiryDate.getDate() + plan.duration);

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        phone,
        email
      });
    }

    const payment = await Payment.create({

      userId: user._id,
      planId: plan._id,
      name,
      phone,
      email,
      planName: plan.name,
      amount: plan.price,
      paymentId: "CASH_" + Date.now(),
      method: "cash",
      status: "Paid",
      startDate,
      expiryDate

    });

    await User.findByIdAndUpdate(user._id, {

      planName: plan.name,
      startDate,
      expiryDate,
      membershipStatus: "Active",
      paymentStatus: "Success"

    });

    res.status(200).json({

      success: true,
      message: "Member added successfully",
      payment

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });

  }

};