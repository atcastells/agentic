import { Inject, Service } from 'typedi';
import { AGENT_SERVICE, EXECUTE_AGENT_USE_CASE } from '../../../constants';
import { ExecuteAgentDto } from '../../dtos/ExecuteAgentDto';
import { AgentExecutionService } from '../../services/AgentExecutionService';
import { AgentService } from '../../services/AgentService'; // Import AgentService
/**
 * @description Use case for executing a specific agent by its ID with given inputs.
 */
@Service(EXECUTE_AGENT_USE_CASE)
export class ExecuteAgentUseCase {
  constructor(
    @Inject(AGENT_SERVICE) private agentService: AgentService, // Inject AgentService
    @Inject() private agentExecutionService: AgentExecutionService
  ) {}

  /**
   * Executes the use case.
   * @param {string} id - The ID of the agent to execute.
   * @param {ExecuteAgentDto} executeAgentDto - DTO containing the input data for the agent.
   * @returns {Promise<Record<string, unknown>>} A promise that resolves to the execution result.
   */
  async execute(id: string, executeAgentDto: ExecuteAgentDto): Promise<Record<string, unknown>> {
    // 1. Fetch the agent definition
    const agent = await this.agentService.getAgentById(id);
    if (!agent) {
      // Or throw a custom NotFoundError
      throw new Error(`Agent with id ${id} not found`);
    }

    // 2. Add authorization, validation, or pre-processing logic here if needed.

    // 3. Delegate the actual execution to the specialized service.
    // Pass the fetched agent and inputs from the DTO.
    return this.agentExecutionService.executeAgent(agent, executeAgentDto.inputs || {});
  }
}