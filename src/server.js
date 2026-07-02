import app from './app.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

    function shutdown() {
        console.log('Shutting down server...');
        server.close(() => {
        console.log('Server closed');
            process.exit(0);
        });
   }
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();