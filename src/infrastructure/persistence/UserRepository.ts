import { Service } from 'typedi';
import { v4 as uuidv4 } from 'uuid'; // Using uuid for unique ID generation
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { USER_REPOSITORY } from '../../constants';

// In-memory store for demonstration purposes
const users: Map<string, User> = new Map();

@Service(USER_REPOSITORY)
export class UserRepository implements IUserRepository {
    async findById(id: string): Promise<User | null> {
        return users.get(id) || null;
    }

    async findByEmail(email: string): Promise<User | null> {
        for (const user of users.values()) {
            if (user.email === email) {
                return user;
            }
        }
        return null;
    }

    async findAll(): Promise<User[]> {
        return Array.from(users.values());
    }

    async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
        const now = new Date();
        const newUser = new User(
            uuidv4(), // Generate a unique ID
            userData.name,
            userData.email,
            now,
            now
        );
        users.set(newUser.id, newUser);
        return newUser;
    }

    async update(id: string, userData: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User | null> {
        const existingUser = users.get(id);
        if (!existingUser) {
            return null;
        }

        const updatedUser = new User(
            existingUser.id,
            userData.name ?? existingUser.name,
            userData.email ?? existingUser.email,
            existingUser.createdAt, // createdAt should not change on update
            new Date() // Update the updatedAt timestamp
        );

        users.set(id, updatedUser);
        return updatedUser;
    }

    async delete(id: string): Promise<boolean> {
        return users.delete(id);
    }
} 