import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { supabase } from "../utils/supabaseClient.js";
import dotenv from "dotenv";
import crypto from "crypto";
import nodemailer from "nodemailer";

dotenv.config();

// SignUp with Email Confirmation
const signUp = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ error: "User already exists" });
    }

    // Send email confirmation via Supabase
    const redirectUrl = `${process.env.BACKEND_URL}/api/users/confirmEmail?email=${email}`;
    console.log("Redirect URL:", redirectUrl);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl },
    });

    if (error) throw error;

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

    res.status(200).json({
      success: true,
      message: "Email confirmed successfully! You can now log in.",
    });
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

    const FRONTEND_URL = process.env.FRONTEND_URL;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.isVerified = true;
    await user.save();

    res.status(200).send(`
      <html>
        <head><title>Email Confirmed</title></head>
        <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
          <h1>Email Verified Successfully! 🎉</h1>
          <p>You can now <a href=${process.env.FRONTEND_URL}/api/login>log in</a>.</p>
        </body>
      </html>
    `);
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
    if (!user) return res.status(400).json({ error: "User not found" });

    // Check if email is verified
    if (!user.isVerified) {
      return res
        .status(400)
        .json({ error: "Please verify your email before logging in." });
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
const validate_role = async (req, res) => {
  const { email, role } = req.body;
  try {
    const user = await User.findOne({ email, role });
    if (user) {
      return res.json({ valid: true });
    } else {
      return res.json({ valid: false });
    }
  } catch (error) {
    console.error("Role validation error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const verify_breed = (req, res) => {
  const { breed } = req.body;
  if (breed === "labrador") {
    return res.json({ valid: true });
  } else {
    return res.json({ valid: false });
  }
};
// Logout
const logout = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User with this email does not exist." });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Set the reset token and expiration in the user's document
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    // Send the reset link via email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}" target="_blank">${resetUrl}</a>
        <p>If you did not request this, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset link sent to your email." });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "Error sending password reset link." });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { resetToken, password } = req.body;

    // Hash the reset token to match the stored hash
    const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Find the user with the matching reset token and check if it's still valid
    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure the token is not expired
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token." });
    }
     // Check if the new password is the same as the current password
     const isSamePassword = await bcrypt.compare(password, user.password);
     if (isSamePassword) {
       return res.status(400).json({ message: "New password cannot be the same as the current password." });
     }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user's password and clear the reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully. You can now log in." });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Error resetting password." });
  }
};

export { signUp, confirmEmail, validate_role, verify_breed, login, logout };
