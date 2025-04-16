# Feature Implementation Guide

This guide outlines the standard process for adding new features to the application, following the established architectural patterns exemplified by the 'Flows' feature.

## Architectural Overview

The application follows a layered architecture:

1.  **Domain:** Contains core business logic, entities, and repository interfaces. It's independent of other layers.
2.  **Application:** Orchestrates use cases, defines DTOs (Data Transfer Objects), and contains application-specific logic using services and use cases. Depends on the Domain layer.
3.  **Infrastructure:** Handles external concerns like web frameworks (Express), databases, dependency injection (TypeDI), and external services. Depends on the Application layer.

## Steps for Implementing a New Feature (e.g., "Users")

1.  **Define Domain Layer Components:**
    *   **Entity:** Create the core domain entity (e.g., `src/domain/entities/User.ts`) representing the feature's main concept. Define its properties and potentially methods encapsulating core business rules.
    *   **Repository Interface:** Define an interface for data persistence operations (e.g., `src/domain/repositories/IUserRepository.ts`). This decouples the application/domain layers from specific database implementations. Include methods like `findById`, `findAll`, `create`, `update`, `delete`, etc., as needed.

2.  **Implement Infrastructure Layer - Persistence:**
    *   **Repository Implementation:** Create a concrete implementation of the repository interface (e.g., `src/infrastructure/persistence/UserRepository.ts`). This class will handle the actual database interactions (e.g., using an ORM like Prisma or TypeORM). Inject necessary database clients/connections.
    *   **Dependency Injection Binding:** Ensure the repository implementation is correctly bound to its interface using TypeDI, typically by defining a constant (e.g., `USER_REPOSITORY` in `src/constants.ts`) and using `@Service(USER_REPOSITORY)` on the implementation class.

3.  **Define Application Layer Components:**
    *   **DTOs (Data Transfer Objects):** Create DTOs for data exchange between layers, especially for request/response payloads (e.g., `src/application/dtos/CreateUserDto.ts`, `src/application/dtos/UpdateUserDto.ts`). Use validation libraries (like `class-validator`) within DTOs if needed.
    *   **Use Cases:** Create specific use case classes for each distinct operation (e.g., `src/application/usecases/user/CreateUserUseCase.ts`, `src/application/usecases/user/GetUserByIdUseCase.ts`).
        *   Each use case should have a single responsibility (e.g., creating a user).
        *   Inject necessary dependencies (repositories, other services) via the constructor using `@Inject`.
        *   Define an `execute` method containing the logic for the use case.
        *   Register the use case with TypeDI using `@Service()` and a corresponding constant (e.g., `CREATE_USER_USE_CASE` in `src/constants.ts`).
    *   **(Optional) Service:** If complex orchestration is needed across multiple use cases or repositories beyond simple CRUD, create an Application Service (e.g., `src/application/services/UserService.ts`).
        *   Inject required repositories and potentially other services/use cases.
        *   Define methods that encapsulate application-specific workflows.
        *   Register the service with TypeDI using `@Service()` and a constant (e.g., `USER_SERVICE` in `src/constants.ts`). *Note: Often, logic can reside directly within Use Cases, making a dedicated Service optional for simpler features.*

4.  **Implement Infrastructure Layer - Web API:**
    *   **Controller:** Create a controller class (e.g., `src/infrastructure/web/controllers/UserController.ts`).
        *   Inject the relevant Use Cases (preferred) or the Application Service via the constructor using `@Inject` and constants (e.g., `CREATE_USER_USE_CASE`).
        *   Define methods corresponding to API endpoints (e.g., `create`, `getById`, `getAll`).
        *   Each method should:
            *   Receive `Request` and `Response` objects.
            *   Extract data from the request (params, body, query, headers).
            *   Validate and potentially transform input data using DTOs.
            *   Call the appropriate Use Case's `execute` method.
            *   Handle potential errors thrown by the use cases/service.
            *   Format the response and send it using the `Response` object.
        *   Register the controller with TypeDI using `@Service()` and a constant (e.g., `USER_CONTROLLER` in `src/constants.ts`).
    *   **Routes:** Define API routes in a dedicated file (e.g., `src/infrastructure/web/routes/userRoutes.ts`).
        *   Create an Express `Router` instance.
        *   Define routes (e.g., `router.post('/', ...)` , `router.get('/:id', ...)`).
        *   Use an `asyncHandler` wrapper for asynchronous controller methods to ensure proper error handling.
        *   Inside each route handler:
            *   Retrieve the controller instance from the TypeDI container: `Container.get<UserController>(USER_CONTROLLER)`.
            *   Call the corresponding controller method, passing `req`, `res`, and `next`.
    *   **Swagger Documentation:** Add Swagger JSDoc comments above each route definition in the routes file (`userRoutes.ts`) to document the API endpoints, parameters, request bodies, and responses. Reference DTOs and potentially create schema definitions in `src/infrastructure/web/swagger/` if needed for complex objects.
    *   **Register Routes in `app.ts`:** Import the new router and register it with the main Express application in `src/infrastructure/web/app.ts` within the `setupRoutes` function:
        ```typescript
        import userRoutes from './routes/userRoutes';
        // ... inside setupRoutes()
        app.use('/api/users', userRoutes);
        ```

5.  **Update Constants:** Ensure all necessary constants for dependency injection keys (repositories, services, use cases, controllers) are defined in `src/constants.ts`.

6.  **Register Components for Dependency Injection:** Import the new repository implementation, controller, and all use case classes in the main application entry point (`src/index.ts`). This ensures TypeDI discovers these classes and can manage their instantiation and injection.
    ```typescript
    // src/index.ts
    // ... other imports

    // Import User feature components for TypeDI registration
    import './infrastructure/persistence/UserRepository';
    import './infrastructure/web/controllers/UserController';
    import './application/usecases/user/CreateUserUseCase';
    import './application/usecases/user/GetUserByIdUseCase';
    import './application/usecases/user/GetAllUsersUseCase';
    import './application/usecases/user/UpdateUserUseCase';
    import './application/usecases/user/DeleteUserUseCase';

    // ... rest of index.ts
    ```

By following these steps, you can integrate new features into the application consistently, maintaining the separation of concerns and leveraging the existing architectural patterns and tools. 