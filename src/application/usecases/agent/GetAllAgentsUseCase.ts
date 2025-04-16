import { Inject, Service } from 'typedi';
import { AGENT_SERVICE, GET_ALL_AGENTS_USE_CASE } from '../../../constants';
import { Agent } from '../../../domain/entities/Agent';
import { AgentService } from '../../services/AgentService';
/**
 * @description Use case for retrieving all agents.
 */
@Service(GET_ALL_AGENTS_USE_CASE)
export class GetAllAgentsUseCase {
  constructor(
    @Inject(AGENT_SERVICE) private agentService: AgentService
  ) {}

  /**
   * Executes the use case.
   * @returns {Promise<Agent[]>} A promise that resolves to an array of agents.
   */
  async execute(): Promise<Agent[]> {
    // In a more complex scenario, this use case could add authorization checks,
    // specific filtering logic not suitable for the service layer, etc.
    return this.agentService.getAllAgents();
  }
}