import express from "express";
import { login, authMiddleware } from "../controllers/authController.js";

const router = express.Router();

// Login route
router.post("/login", login);

// Token verification route
router.get("/verify", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Token is valid", userId: req.userId });
});

export default router;
