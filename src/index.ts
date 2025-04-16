import 'reflect-metadata';
// Keep TypeDI side-effect imports FIRST
// Import services and repositories BEFORE starting the app
// This ensures TypeDI discovers them before the app tries to use them

// Agent feature components
import './application/usecases/agent/CreateAgentUseCase';
import './application/usecases/agent/DeleteAgentUseCase';
import './application/usecases/agent/ExecuteAgentUseCase';
import './application/usecases/agent/GetAgentByIdUseCase';
import './application/usecases/agent/GetAllAgentsUseCase';
import './application/usecases/agent/UpdateAgentUseCase';
import './infrastructure/repositories/MongoAgentRepository'; // Ensure repository is registered
import './infrastructure/web/controllers/AgentController'; // Ensure controller is registered

// User feature components
import './application/usecases/user/CreateUserUseCase';
import './application/usecases/user/DeleteUserUseCase';
import './application/usecases/user/GetAllUsersUseCase';
import './application/usecases/user/GetUserByIdUseCase';
import './application/usecases/user/UpdateUserUseCase';
import './infrastructure/persistence/UserRepository'; // Ensure repository is registered
import './infrastructure/web/controllers/UserController'; // Ensure controller is registered

// Import server starter AFTER side-effect imports
import { startServer } from './server';

// Start the server
startServer().catch(error => {
  console.error('Failed to start the server:', error);
  process.exit(1);
}); 