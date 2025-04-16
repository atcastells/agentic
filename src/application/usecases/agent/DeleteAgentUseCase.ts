import { Inject, Service } from 'typedi';
import { AGENT_SERVICE, DELETE_AGENT_USE_CASE } from '../../../constants';
import { AgentService } from '../../services/AgentService';
/**
 * @description Use case for deleting a specific agent by its ID.
 */
@Service(DELETE_AGENT_USE_CASE)
export class DeleteAgentUseCase {
  constructor(
    @Inject(AGENT_SERVICE) private agentService: AgentService
  ) {}

  /**
   * Executes the use case.
   * @param {string} id - The ID of the agent to delete.
   * @returns {Promise<boolean>} A promise that resolves to true if deletion was successful, false otherwise.
   */
  async execute(id: string): Promise<boolean> {
    // Add authorization checks here if needed (e.g., can the current user delete this agent?)
    return this.agentService.deleteAgent(id);
  }
}