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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Email Confirmation Handler
const confirmEmail = async (req, res) => {
  try {
    const { email } = req.query; // Get email from query parameters
    console.log("Email confirmation request for:", email);
    if (!email) {
      return res.status(400).json({ error: "Invalid confirmation request" });
    }

    // Check if the email is verified in Supabase
    const { data, error } = await supabase.auth.api.getUserByEmail(email);
    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Supabase error" });
    }

    if (!data || !data.email_confirmed_at) {
      console.log("Email not verified in Supabase");
      return res.status(400).json({ error: "Email not verified" });
    }

    // Find the user in MongoDB
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    // Update the isVerified field to true
    user.isVerified = true;
    await user.save();
    console.log("User verified successfully:", user);

    res.status(200).json({ message: "Email confirmed successfully! You can now log in." });
  } catch (err) {
    console.error("Email confirmation error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Login (Only Verified Users)
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid credentials");
      return res.status(400).json({ error: "Invalid credentials" });
    }

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
    console.error("Login error:", error);
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
