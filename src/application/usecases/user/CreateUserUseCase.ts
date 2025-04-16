import { Inject, Service } from 'typedi';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { User } from '../../../domain/entities/User';
import { CreateUserDto } from '../../dtos/user/CreateUserDto';
import { USER_REPOSITORY, CREATE_USER_USE_CASE } from '../../../constants';
import { AppError } from '../../errors/AppError'; // Assuming a custom error class exists

@Service(CREATE_USER_USE_CASE)
export class CreateUserUseCase {
    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository
    ) {}

    async execute(createUserDto: CreateUserDto): Promise<User> {
        // Check if user with the same email already exists
        const existingUser = await this.userRepository.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new AppError('Email already in use', 409); // Conflict
        }

        // Note: In a real app, password hashing would happen here or in the domain entity
        const user = await this.userRepository.create({
            name: createUserDto.name,
            email: createUserDto.email,
            // other default properties if any
        });

        return user;
    }
} 