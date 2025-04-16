import { Inject, Service } from 'typedi';
import { AGENT_SERVICE, UPDATE_AGENT_USE_CASE } from '../../../constants';
import { Agent } from '../../../domain/entities/Agent';
import { UpdateAgentDto } from '../../dtos/UpdateAgentDto';
import { AgentService } from '../../services/AgentService';
/**
 * @description Use case for updating an existing agent.
 */
@Service(UPDATE_AGENT_USE_CASE)
export class UpdateAgentUseCase {
  constructor(
    @Inject(AGENT_SERVICE) private agentService: AgentService
  ) {}

  /**
   * Executes the use case.
   * @param {string} id - The ID of the agent to update.
   * @param {UpdateAgentDto} updateAgentDto - The data transfer object containing the updates.
   * @returns {Promise<Agent | null>} A promise that resolves to the updated agent or null if not found.
   */
  async execute(id: string, updateAgentDto: UpdateAgentDto): Promise<Agent | null> {
    // Here, we could add more complex logic like:
    // - Checking if the user has permission to update this specific agent.
    // - Validating specific business rules before updating.
    // - Transforming the DTO if needed before passing it to the service.
    
    // The service layer handles the core update logic.
    // We pass the DTO directly for now, assuming the service handles partial updates.
    // Note: The original controller added `updatedAt`. This responsibility should ideally
    // be handled consistently, either in the service or repository layer (e.g., via hooks).
    // For simplicity, we'll assume the service handles it or it's managed by the DB schema.
    return this.agentService.updateAgent(id, updateAgentDto);
  }
}