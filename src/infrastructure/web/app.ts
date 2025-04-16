import express, { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { json, urlencoded } from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import flowRoutes from './routes/flowRoutes';
import userRoutes from './routes/userRoutes';

// Custom error class for API errors
export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Initialize express application
const app = express();

/**
 * Configure Swagger documentation
 */
const setupSwagger = () => {
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Flow API',
        version: '1.0.0',
        description: 'API documentation for Flow service',
      },
      servers: [
        {
          url: 'http://localhost:3000/api',
          description: 'Development server',
        },
      ],
    },
    apis: [
      './src/infrastructure/web/routes/*.ts',
      './src/infrastructure/web/swagger/*.ts'
    ],
  };

  return swaggerJsdoc(swaggerOptions);
}

/**
 * Configure application middleware
 */
const setupMiddleware = () => {
  // Request parsing
  app.use(json());
  app.use(urlencoded({ extended: true }));
}

/**
 * Configure API routes
 */
const setupRoutes = () => {
  // Swagger documentation
  const swaggerSpec = setupSwagger();
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
  // API routes
  app.use('/api/flows', flowRoutes);
  app.use('/api/users', userRoutes);
  
  // 404 handler for undefined routes
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: `Route ${req.path} not found`
    });
  });
}

/**
 * Configure error handling middleware
 */
const setupErrorHandling = () => {
  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // Log the error
    console.error(`[ERROR] ${err.name}: ${err.message}`);
    if (process.env.NODE_ENV !== 'production') {
      console.error(err.stack);
    }

    // Handle specific error types
    if (err.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: err.errors,
      });
      return;
    }
    
    if (err.name === 'SyntaxError' && 'body' in err) {
      res.status(400).json({
        success: false,
        message: 'Invalid JSON',
      });
      return;
    }
    
    if (err.name === 'ApiError' || err instanceof ApiError) {
      res.status(err.status).json({
        success: false,
        message: err.message,
      });
      return;
    }
    
    // Generic error handler
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(statusCode).json({
      success: false,
      message,
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
  };

  app.use(errorHandler);
}

// Initialize the application
function initializeApp() {
  setupMiddleware();
  setupRoutes();
  setupErrorHandling();
  return app;
}

// Export the initialized app
export default initializeApp(); 