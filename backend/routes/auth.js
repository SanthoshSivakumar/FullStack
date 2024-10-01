// import express from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const router = express.Router();

// // Login route
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ success: false, error: "User not found" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ success: false, error: "Invalid credentials" });
//         }

//         const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_KEY || 'jwtsecretkeyAAA333', { expiresIn: '10d' });
        
//         res.json({ success: true, user: { _id: user._id, name: user.name, role: user.role }, token });
//     } catch (error) {
//         console.error("Login error:", error);
//         res.status(500).json({ success: false, error: "Server error" });
//     }
// });

// // Token verification route
// router.post('/verify', (req, res) => {
//     const token = req.body.token;

//     if (!token) {
//         return res.status(403).json({ success: false, error: "Token is required" });
//     }

//     jwt.verify(token, process.env.JWT_KEY || 'jwtsecretkeyAAA333', (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ success: false, error: "Invalid token" });
//         }

//         // If token is valid, return the decoded user information
//         res.json({ success: true, userId: decoded.id, role: decoded.role });
//     })

// export default router;


import express from 'express';
import { login, authMiddleware,verify } from '../controllers/authController.js';

const router = express.Router();

// Login route
router.post('/login', login);

// Token verification route
router.post('/verify', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Token is valid', userId: req.userId });
});

export default router;


