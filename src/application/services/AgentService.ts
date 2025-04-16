import { Inject, Service } from 'typedi';
import { AGENT_REPOSITORY, AGENT_SERVICE } from '../../constants';
import { Agent } from '../../domain/entities/Agent';
import { IAgentRepository } from '../../domain/repositories/AgentRepository';

@Service(AGENT_SERVICE)
export class AgentService {
  constructor(@Inject(AGENT_REPOSITORY) private agentRepository: IAgentRepository) {}

  async getAgentById(id: string): Promise<Agent | null> {
    return this.agentRepository.findById(id);
  }

  async getAllAgents(): Promise<Agent[]> {
    return this.agentRepository.findAll();
  }

  async getUserAgents(userId: string): Promise<Agent[]> {
    return this.agentRepository.findByUserId(userId);
  }

  async createAgent(agentData: Omit<Agent, 'id'>): Promise<Agent> {
    return this.agentRepository.create(agentData);
  }

  async updateAgent(id: string, agentData: Partial<Agent>): Promise<Agent | null> {
    return this.agentRepository.update(id, agentData);
  }

  async deleteAgent(id: string): Promise<boolean> {
    return this.agentRepository.delete(id);
  }

  async executeAgent(id: string, inputs: Record<string, unknown>): Promise<Record<string, unknown>> {
    // Get the agent
    const agent = await this.agentRepository.findById(id);
    if (!agent) {
      throw new Error(`Agent with id ${id} not found`);
    }

    // Here we would implement the agent execution logic
    // This is just a placeholder for now
    return {
      success: true,
      agentId: id,
      executionId: `exec-${Date.now()}`,
      outputs: {
        result: `Executed agent: ${agent.name} with inputs: ${JSON.stringify(inputs)}`,
      },
    };
  }
} 