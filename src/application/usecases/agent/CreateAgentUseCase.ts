import { Inject, Service } from 'typedi';
import { AGENT_SERVICE, CREATE_AGENT_USE_CASE } from '../../../constants';
import { Agent } from '../../../domain/entities/Agent'; // Assuming Agent entity path
import { CreateAgentDto } from '../../dtos/CreateAgentDto';
import { AgentService } from '../../services/AgentService'; // Adjust path if necessary
@Service(CREATE_AGENT_USE_CASE)
export class CreateAgentUseCase {
  constructor(@Inject(AGENT_SERVICE) private agentService: AgentService) {}

  async execute(data: CreateAgentDto, userId: string): Promise<Agent> {
    const agentData = {
      ...data,
      userId,
      version: '1.0.0',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Assuming agentService.createAgent expects this structure and returns the created Agent
    const createdAgent = await this.agentService.createAgent(agentData); 
    
    return createdAgent;
  }
} 