import { Inject, Service } from 'typedi';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { User } from '../../../domain/entities/User';
import { USER_REPOSITORY, GET_USER_BY_ID_USE_CASE } from '../../../constants';
import { AppError } from '../../errors/AppError';

@Service(GET_USER_BY_ID_USE_CASE)
export class GetUserByIdUseCase {
    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository
    ) {}

    async execute(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return user;
    }
} 