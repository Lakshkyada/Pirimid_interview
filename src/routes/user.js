import express from 'express';
import { sendConnection,responceConn } from '../controllers/user.js';
const router = express.Router();

// Example route for user registration
router.post('/', sendConnection);
router.patch('/response', responceConn);

export default router;
    

