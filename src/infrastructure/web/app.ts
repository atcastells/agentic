import express from 'express';
import 'express-async-errors';
import { json, urlencoded } from 'body-parser';
import flowRoutes from './routes/flowRoutes';
import llmProviderRoutes from './routes/llmProviderRoutes';

const app = express();

// Configure middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Configure routes
app.use('/api/flows', flowRoutes);
app.use('/api/llm-providers', llmProviderRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app; 