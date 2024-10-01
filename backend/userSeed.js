import bcrypt from 'bcrypt';
import User from './models/User.js';
import connectToDatabase from './db/db.js';

const userRegister = async () => {
    try {
        await connectToDatabase(); // Ensure database connection

        const hashPassword = await bcrypt.hash("wwww", 10); // Hash the password
        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword, // Use the hashed password
            role: "admin"
        });

        await newUser.save();
        console.log("Admin user registered successfully");
    } catch (error) {
        console.error("Error creating admin user:", error);
    }
};

userRegister();
