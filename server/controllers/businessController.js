import { generateToken } from "../configs/utils.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Business from "../models/business.js";
dotenv.config();

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both email and password" });
    }
    const business = await Business.findOne({ email })
      
    if (!business) return res.status(400).json({ message: "Business not found" });

    const isMatch = await bcrypt.compare(password, business.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    await generateToken(business._id, res);

    res.json({
      message: "Login successful",
      business: {
        id: business._id,
        name: business.name,
        email: business.email,
        businessType: business.businessType,
      },
    });
    
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { email, password, fullName, businessType } = req.body;
    console.log(email, password, fullName, businessType);
    if (!email || !password || !fullName || !businessType) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const existingBusiness = await Business.findOne({ email });
    if (existingBusiness) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newBusiness = new Business({ name: fullName, businessType, email, password: hashedPassword });

    if (newBusiness) {
      await generateToken(newBusiness._id, res);
      await newBusiness.save();
      return res.status(201).json({
        message: "Account Created successfully",
        business: {
          id: newBusiness._id,
          name: newBusiness.name,
          email: newBusiness.email,
          businessType: newBusiness.businessType,
        },
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 0,
      path: "/"
    });
    res.json({ message: "Logout successful" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const checkUser = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};