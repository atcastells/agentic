import { Request, Response, NextFunction } from 'express';
import { Service, Inject, Container } from 'typedi';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDto } from '../../../application/dtos/user/CreateUserDto';
import { UpdateUserDto } from '../../../application/dtos/user/UpdateUserDto';
import { CreateUserUseCase } from '../../../application/usecases/user/CreateUserUseCase';
import { GetUserByIdUseCase } from '../../../application/usecases/user/GetUserByIdUseCase';
import { GetAllUsersUseCase } from '../../../application/usecases/user/GetAllUsersUseCase';
import { UpdateUserUseCase } from '../../../application/usecases/user/UpdateUserUseCase';
import { DeleteUserUseCase } from '../../../application/usecases/user/DeleteUserUseCase';
import {
    USER_CONTROLLER,
    CREATE_USER_USE_CASE,
    GET_USER_BY_ID_USE_CASE,
    GET_ALL_USERS_USE_CASE,
    UPDATE_USER_USE_CASE,
    DELETE_USER_USE_CASE
} from '../../../constants';
import { AppError } from '../../../application/errors/AppError';

@Service(USER_CONTROLLER)
export class UserController {
    constructor(
        // Inject use cases directly into the controller
        @Inject(CREATE_USER_USE_CASE) private readonly createUserUseCase: CreateUserUseCase,
        @Inject(GET_USER_BY_ID_USE_CASE) private readonly getUserByIdUseCase: GetUserByIdUseCase,
        @Inject(GET_ALL_USERS_USE_CASE) private readonly getAllUsersUseCase: GetAllUsersUseCase,
        @Inject(UPDATE_USER_USE_CASE) private readonly updateUserUseCase: UpdateUserUseCase,
        @Inject(DELETE_USER_USE_CASE) private readonly deleteUserUseCase: DeleteUserUseCase
    ) {}

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const createUserDto = plainToClass(CreateUserDto, req.body);
            const errors = await validate(createUserDto);
            if (errors.length > 0) {
                // Concatenate error messages for a clearer response
                const message = errors.map(err => Object.values(err.constraints || {})).join(', ');
                throw new AppError(`Validation failed: ${message}`, 400);
            }

            const user = await this.createUserUseCase.execute(createUserDto);
            // Note: We might want to return a UserDto instead of the full User entity
            res.status(201).json(user);
        } catch (error) {
            next(error); // Pass error to the global error handler
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const user = await this.getUserByIdUseCase.execute(id);
            // Note: We might want to return a UserDto instead of the full User entity
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await this.getAllUsersUseCase.execute();
            // Note: We might want to return UserDto[] instead of User[]
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const updateUserDto = plainToClass(UpdateUserDto, req.body);
            const errors = await validate(updateUserDto);
            if (errors.length > 0) {
                const message = errors.map(err => Object.values(err.constraints || {})).join(', ');
                throw new AppError(`Validation failed: ${message}`, 400);
            }

            const user = await this.updateUserUseCase.execute(id, updateUserDto);
            // Note: We might want to return a UserDto instead of the full User entity
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            await this.deleteUserUseCase.execute(id);
            res.status(204).send(); // No content on successful deletion
        } catch (error) {
            next(error);
        }
    }
} 