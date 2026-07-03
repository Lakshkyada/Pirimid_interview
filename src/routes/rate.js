import express from 'express';
import { createrate,searchRate } from '../controllers/rate.js';
const router = express.Router();

// Example route for user registration
router.post('/', createrate);
router.get('/search', searchRate);

export default router;
    

