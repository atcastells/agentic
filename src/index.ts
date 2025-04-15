import 'reflect-metadata';
import mongoose from 'mongoose';
import { Container } from 'typedi';
import app from './infrastructure/web/app';
import env from './config/env';
import { MongoFlowRepository } from './infrastructure/repositories/MongoFlowRepository';

// Connect to MongoDB
async function startServer(): Promise<void> {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Container is automatically configured through decorators

    const server = app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`);
    });

    // Handle graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed');
        mongoose.connection.close().then(() => {
          console.log('MongoDB connection closed');
          process.exit(0);
        });
      });
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

// Start the server
startServer().catch(console.error); 