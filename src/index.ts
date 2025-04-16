import 'reflect-metadata';
import mongoose from 'mongoose';
import env from './config/env';

// Import services and repositories BEFORE importing the app
// This ensures TypeDI discovers them before the app tries to use them
import './infrastructure/repositories/MongoFlowRepository'; // Ensure repository is registered
import './infrastructure/web/controllers/FlowController'; // Ensure controller is registered
import  './application/usecases/flow/CreateFlowUseCase';
import  './application/usecases/flow/GetAllFlowsUseCase';
import  './application/usecases/flow/GetFlowByIdUseCase';
import  './application/usecases/flow/UpdateFlowUseCase';
import  './application/usecases/flow/DeleteFlowUseCase';
import  './application/usecases/flow/ExecuteFlowUseCase';


import app from './infrastructure/web/app';
// Connect to MongoDB
async function startServer(): Promise<void> {
  try {


    // Register all services - Explicitly instantiate and register all dependencies
    // Explicit registration removed - Relying on @Service decorators
    // Let TypeDI handle the instantiation of FlowService
    // which will now have the repository injected correctly

    await mongoose.connect(env.MONGODB_URI);
    console.log('Connected to MongoDB');
   
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