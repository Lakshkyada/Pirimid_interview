import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
export const registerUser = async (req, res) => {
    const { username, password } = req.body;
    const email = req.body.email?.trim()?.toLowerCase();
   try {
       if (!username || !email || !password) {
         return res.status(400).json({
            success: false,
            message: "All fields are required"
         });
       }
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

       if (!emailRegex.test(email)) {
           return res.status(400).json({
            success: false,
            message: "Invalid email format"
          });
       }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error registering user"
        });
    }
};

export const loginUser = async (req, res) => {
    const { password } = req.body;
    const email = req.body.email?.trim()?.toLowerCase();
    try {
        if (!email || !password) {
              return res.status(400).json({
                success: false,
                message: "Email and password are required"
           });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({
            success: true,
             message: "Login successful",
            token,
            user: {
               id: user._id,
               username: user.username,
               email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error logging in user"
        });
    }
};
