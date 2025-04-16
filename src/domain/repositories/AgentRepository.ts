import { Agent } from '../entities/Agent';

export interface IAgentRepository {
  findById(id: string): Promise<Agent | null>;
  findAll(): Promise<Agent[]>;
  findByUserId(userId: string): Promise<Agent[]>;
  create(agent: Omit<Agent, 'id'>): Promise<Agent>;
  update(id: string, agent: Partial<Agent>): Promise<Agent | null>;
  delete(id: string): Promise<boolean>;
} 
