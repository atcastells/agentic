import { Service, Inject } from 'typedi';
import { FlowExecutionService } from '../../services/FlowExecutionService';
import { FlowService } from '../../services/FlowService'; // Import FlowService
import { ExecuteFlowDto } from '../../dtos/ExecuteFlowDto';
import { FLOW_SERVICE, EXECUTE_FLOW_USE_CASE } from '../../../constants';
/**
 * @description Use case for executing a specific flow by its ID with given inputs.
 */
@Service(EXECUTE_FLOW_USE_CASE)
export class ExecuteFlowUseCase {
  constructor(
    @Inject(FLOW_SERVICE) private flowService: FlowService, // Inject FlowService
    @Inject() private flowExecutionService: FlowExecutionService
  ) {}

  /**
   * Executes the use case.
   * @param {string} id - The ID of the flow to execute.
   * @param {ExecuteFlowDto} executeFlowDto - DTO containing the input data for the flow.
   * @returns {Promise<Record<string, unknown>>} A promise that resolves to the execution result.
   */
  async execute(id: string, executeFlowDto: ExecuteFlowDto): Promise<Record<string, unknown>> {
    // 1. Fetch the flow definition
    const flow = await this.flowService.getFlowById(id);
    if (!flow) {
      // Or throw a custom NotFoundError
      throw new Error(`Flow with id ${id} not found`);
    }

    // 2. Add authorization, validation, or pre-processing logic here if needed.

    // 3. Delegate the actual execution to the specialized service.
    // Pass the fetched flow and inputs from the DTO.
    return this.flowExecutionService.executeFlow(flow, executeFlowDto.inputs || {});
  }
}