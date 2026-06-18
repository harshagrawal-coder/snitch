import jwt from "jsonwebtoken";
import { Config } from "../config/Config.js";
import usermodel from "../model/user.schema.js";

export const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "token is not provided",
    });
  }
try {
    const decoded = jwt.verify(token, Config.JWT_SECRET);
  const user = await usermodel.findById(decoded.id)
  if(!user){
    return res.status(401).json({
      success:false,
      message:"unauthorized"
    })
  }
  req.user=user
  next()
} catch (error) {
  return res.status(500).json({
    success:false,
    message:error.message
  })
}

};

export const authenticateSeller = async (req, res, next) => {
  const token = req.cookies.token;
  // console.log(token);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "token is not provided",
    });
  }
  try {
    const decoded = jwt.verify(token, Config.JWT_SECRET);
    console.log(decoded);
    const user = await usermodel.findById(decoded.id);
    console.log("user =", user);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }
    if (user.role != "seller") {
      return res.status(403).json({
        message: "forbidden",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "unauthorized",
    });
  }
};
