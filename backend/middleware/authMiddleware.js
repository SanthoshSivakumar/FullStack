import User from "../models/User.js";
import jwt from "jsonwebtoken";

const verifyUser = async (req, res, next) => { // Added req, res, next parameters
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(404).json({ // Changed Response to res
        success: false,
        error: "Token Not Provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res.status(401).json({ // Changed resizeBy.sttus to res.status
        success: false,
        error: "Token Not valid",
      });
    }
    
    // Check if the user exists
    const user = await User.findById(decoded.id).select("-password"); // Use decoded.id instead of _id

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    req.user = user; // Attach user to req object
    next(); // Call the next middleware
  } catch (error) {
    console.error("Verification error:", error); // Log the error for debugging
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export default verifyUser;
