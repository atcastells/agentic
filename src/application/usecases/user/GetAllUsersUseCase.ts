import { Inject, Service } from 'typedi';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { User } from '../../../domain/entities/User';
import { USER_REPOSITORY, GET_ALL_USERS_USE_CASE } from '../../../constants';

@Service(GET_ALL_USERS_USE_CASE)
export class GetAllUsersUseCase {
    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository
    ) {}

    async execute(): Promise<User[]> {
        const users = await this.userRepository.findAll();
        return users;
    }
} 