const User = require("../models/User");
const bcrypt = require("bcryptjs");


// REGISTER
const register = async (req, res) => {

  try {

    const { name, email, phone, password, address, bloodGroup } = req.body;

    // Check existing user
    const existingUser = await User.findOne({
      $or: [
        { email: email },
        { phone: phone }
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
      bloodGroup
    });

    await user.save();

    res.json({
      message: "User Registered Successfully",
      user
    });

  } catch (error) {

    res.status(500).json({
      message: "Registration failed",
      error: error.message
    });

  }

};


// LOGIN
const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      $or: [
        { email: email },
        { phone: email }
      ]
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        bloodGroup: user.bloodGroup,
        planName: user.planName,
        planType: user.planType,
        startDate: user.startDate,
        expiryDate: user.expiryDate,
        membershipStatus: user.membershipStatus
      }
    });

  } catch (error) {

    res.status(500).json({
      message: "Login failed",
      error: error.message
    });

  }

};


// EXPORT
module.exports = {
  register,
  login
};