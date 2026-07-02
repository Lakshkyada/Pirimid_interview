import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.js';
const router = express.Router();

// Example route for user registration
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
    

