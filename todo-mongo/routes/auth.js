import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authRoutes = express.Router();

authRoutes.post("/register", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ message: "user already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    
    res.status(200).json({ user, message: "user registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
});

authRoutes.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "not registered" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(404).json({ message: "incorrect credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return res.json({ token, message: "logged in successfully" });
  } catch (err) {
    return res.status(500).json({ message: "server error", err });
  }
});

export default authRoutes;