// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ success: false, error: "User Not Found" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ success: false, error: "Invalid Password" });
//         }

//         const token = jwt.sign(
//             { _id: user._id, role: user.role },
//             process.env.JWT_KEY, 
//             { expiresIn: "10d" }
//         );

//         res.status(200).json({ 
//             success: true, 
//             token, 
//             user: { _id: user._id, name: user.name, role: user.role },
//         });
//     } catch (error) {   
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// export { login };
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
    const token = req.body.token;

    if (!token) {
        return res.status(403).json({ success: false, error: "Token is required" });
    }

    jwt.verify(token, process.env.JWT_KEY || 'jwtsecretkeyAAA333', (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, error: "Invalid token" });
        }
        req.userId = decoded.id; // Store the user ID in the request object
        req.role = decoded.role; // Optionally store the user role
        next(); // Call the next middleware or route handler
    });
};


export const verify = (req,res) => {
    return res.status(200).json({success:true,user:req.user})
}