import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Login handler
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_KEY || 'jwtsecretkeyAAA333', { expiresIn: '10d' });
        
        res.json({ success: true, user: { _id: user._id, name: user.name, role: user.role }, token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, error: "Server error" });
    }
};

// Auth middleware for token verification
export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Safely access the token

    if (!token) {
        return res.status(401).json({ success: false, error: "Token not provided" });
    }

    jwt.verify(token, process.env.JWT_KEY || 'jwtsecretkeyAAA333', (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, error: "Invalid token" });
        }
        req.userId = decoded.id; // Attach user ID to the request object
        next(); // Proceed to the next middleware or route handler
    });
};
