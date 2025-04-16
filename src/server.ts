import http from 'http';
import app from './infrastructure/web/app';
import env from './config/env';
import { connectDB, disconnectDB } from './config/database';

let server: http.Server;

export const startServer = async (): Promise<void> => {
  await connectDB(); // Connect to DB before starting the server

  server = app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`);
  });

  // Handle graceful shutdown
  process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing HTTP server');
    await shutdown();
  });

  // Optional: Handle other signals like SIGINT (Ctrl+C)
  process.on('SIGINT', async () => {
    console.log('SIGINT signal received: closing HTTP server');
    await shutdown();
  });
};

const shutdown = async (): Promise<void> => {
  server.close(async (err) => {
    if (err) {
      console.error('Error closing HTTP server', err);
      process.exit(1); // Exit with error if server closing fails
    }
    console.log('HTTP server closed');
    await disconnectDB(); // Disconnect DB after server stops accepting connections
    process.exit(0); // Exit gracefully
  });

  // Optional: Force close server after a timeout if graceful shutdown fails
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000); // 10 seconds timeout
}; 