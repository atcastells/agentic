import 'reflect-metadata';
// Keep TypeDI side-effect imports FIRST
// Import services and repositories BEFORE starting the app
// This ensures TypeDI discovers them before the app tries to use them

// Flow feature components
import './infrastructure/repositories/MongoFlowRepository'; // Ensure repository is registered
import './infrastructure/web/controllers/FlowController';   // Ensure controller is registered
import './application/usecases/flow/CreateFlowUseCase';
import './application/usecases/flow/GetAllFlowsUseCase';
import './application/usecases/flow/GetFlowByIdUseCase';
import './application/usecases/flow/UpdateFlowUseCase';
import './application/usecases/flow/DeleteFlowUseCase';
import './application/usecases/flow/ExecuteFlowUseCase';

// User feature components
import './infrastructure/persistence/UserRepository'; // Ensure repository is registered
import './infrastructure/web/controllers/UserController'; // Ensure controller is registered
import './application/usecases/user/CreateUserUseCase';
import './application/usecases/user/GetUserByIdUseCase';
import './application/usecases/user/GetAllUsersUseCase';
import './application/usecases/user/UpdateUserUseCase';
import './application/usecases/user/DeleteUserUseCase';

// Import server starter AFTER side-effect imports
import { startServer } from './server';

// Start the server
startServer().catch(error => {
  console.error('Failed to start the server:', error);
  process.exit(1);
}); 