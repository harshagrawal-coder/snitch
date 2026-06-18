import express from "express";
import { Router } from "express";
import {
  register,
  login,
  googleOAuth,
  getmeuser,
} from "../controller/auth.controller.js";
import {
  validateRegisterUser,
  validateLoginUser,
} from "../validator/auth.validator.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import passport from "passport";
const authRouter = Router();

authRouter.post("/register", validateRegisterUser, register);
authRouter.post("/login", validateLoginUser, login);
authRouter.get(
  "/api/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);
authRouter.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    session: false,
  }),
  googleOAuth,
);

authRouter.get("/get-me", authenticateUser, getmeuser);
export default authRouter;
