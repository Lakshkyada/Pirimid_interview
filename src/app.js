import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import authMiddleware from './middlewares/authMiddleware.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running..."
    });
});

// API routes
app.use('/api/v1/auth', authRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

export default app;