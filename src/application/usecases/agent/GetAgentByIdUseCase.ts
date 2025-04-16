import { Inject, Service } from 'typedi';
import { AGENT_SERVICE, GET_AGENT_BY_ID_USE_CASE } from '../../../constants';
import { Agent } from '../../../domain/entities/Agent';
import { AgentService } from '../../services/AgentService';
/**
 * @description Use case for retrieving a specific agent by its ID.
 */
@Service(GET_AGENT_BY_ID_USE_CASE)
export class GetAgentByIdUseCase {
  constructor(
    @Inject(AGENT_SERVICE) private agentService: AgentService
  ) {}

  /**
   * Executes the use case.
   * @param {string} id - The ID of the agent to retrieve.
   * @returns {Promise<Agent | null>} A promise that resolves to the agent or null if not found.
   */
  async execute(id: string): Promise<Agent | null> {
    // Similar to GetAllAgents, authorization or specific validation logic could be added here.
    return this.agentService.getAgentById(id);
  }
}