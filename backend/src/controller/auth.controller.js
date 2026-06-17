import usermodel from "../model/user.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Config } from "../config/Config.js";
// import jwt from "jsonwebtoken";
export const sendToken = (user, statusCode, res, message) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message,
      user: {
        email: user.email,
        name: user.name,
        contact: user.contact,
        role: user.role,
      },
    });
};
export async function register(req, res) {
  try {
    const { email, password, fullname, contact, isSeller } = req.body;

    const existingUser = await usermodel.findOne({
      $or: [{ email }, { contact }],
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or contact already registered",
      });
    }

    const user = await usermodel.create({
      email,
      password,
      contact,
      name: fullname,
      role: isSeller ? "seller" : "buyer",
    });

    return sendToken(user, 201, res, "User registered successfully");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "email is not registered",
      });
    }
    const user = await usermodel.findOne({ email }).select("+password");
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "invalid password",
      });
    }
    await sendToken(user, 200, res, "loggedIN successfully");
  } catch (error) {}
}

export async function googleOAuth(req, res) {
  try {
    const profile = req.user;

    const email = profile.emails[0].value;

    let user = await usermodel.findOne({ email });

    if (!user) {
      user = await usermodel.create({
        email,
        name: profile.displayName,
        isGoogleUser: true,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.redirect("http://localhost:5173/");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
