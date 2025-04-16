import { User } from '../entities/User';

export interface IUserRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
    update(id: string, user: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User | null>;
    delete(id: string): Promise<boolean>;
} 