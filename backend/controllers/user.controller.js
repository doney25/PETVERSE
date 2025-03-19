import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { supabase } from "../utils/supabaseClient.js";

// SignUp with Email Confirmation
const signUp = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists');
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user in MongoDB (initially unverified)
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      isVerified: false, // New field to track verification
    });

    await newUser.save();
    console.log("User saved successfully:", newUser);
    // Send email confirmation via Supabase
    const { error } = await supabase.auth.signUp({
      email,
      password,
    }, {
      emailRedirectTo: "http://localhost:5501/api/users/confirmEmail",
    });
    console.log("send to supabse.")
    if (error) throw error;

    res.status(201).json({ message: "Signup successful! Check your email to verify your account." });
    console.log('jiii12')

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Email Confirmation Handler
const confirmEmail = async (req, res) => {
  try {
    const { email } = req.query; // Get email from query parameters

    if (!email) {
      return res.status(400).json({ error: "Invalid confirmation request" });
    }

    // Find and update the user in MongoDB
    const user = await User.findOneAndUpdate(
      { email: email },
      { isVerified: true },
    );

    if (!user) {
      return res.status(404).json({ error: "User not found or already verified" });
    }

    res.status(200).json({ message: "Email confirmed successfully! You can now log in." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Login (Only Verified Users)
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(400).json({ error: "Please verify your email before logging in." });
      console.log('jiii14')

    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout
const logout = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

export { signUp, confirmEmail, login, logout };
