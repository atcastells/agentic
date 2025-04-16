import { Inject, Service } from 'typedi';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { USER_REPOSITORY, DELETE_USER_USE_CASE } from '../../../constants';
import { AppError } from '../../errors/AppError';

@Service(DELETE_USER_USE_CASE)
export class DeleteUserUseCase {
    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository
    ) {}

    async execute(id: string): Promise<void> {
        // Optional: Check if user exists before attempting delete
        // const existingUser = await this.userRepository.findById(id);
        // if (!existingUser) {
        //     throw new AppError('User not found', 404);
        // }

        const success = await this.userRepository.delete(id);

        if (!success) {
            // This could mean the user didn't exist or the delete operation failed
            throw new AppError('User not found or failed to delete', 404);
        }

        // No return value needed for successful deletion
    }
} 