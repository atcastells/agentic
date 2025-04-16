import { Flow } from '../entities/Flow';

export interface IFlowRepository {
  findById(id: string): Promise<Flow | null>;
  findAll(): Promise<Flow[]>;
  findByUserId(userId: string): Promise<Flow[]>;
  create(flow: Omit<Flow, 'id'>): Promise<Flow>;
  update(id: string, flow: Partial<Flow>): Promise<Flow | null>;
  delete(id: string): Promise<boolean>;
} 
