import { Inject, Service } from 'typedi';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { User } from '../../../domain/entities/User';
import { UpdateUserDto } from '../../dtos/user/UpdateUserDto';
import { USER_REPOSITORY, UPDATE_USER_USE_CASE } from '../../../constants';
import { AppError } from '../../errors/AppError';

@Service(UPDATE_USER_USE_CASE)
export class UpdateUserUseCase {
    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository
    ) {}

    async execute(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        // Check if user exists
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new AppError('User not found', 404);
        }

        // Check if the new email is already taken by another user
        if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
            const userWithSameEmail = await this.userRepository.findByEmail(updateUserDto.email);
            if (userWithSameEmail && userWithSameEmail.id !== id) {
                throw new AppError('Email already in use by another user', 409); // Conflict
            }
        }

        // Perform the update
        const updatedUser = await this.userRepository.update(id, updateUserDto);

        if (!updatedUser) {
            // This might happen in extremely rare race conditions or if DB update fails
            throw new AppError('Failed to update user', 500);
        }

        return updatedUser;
    }
} 