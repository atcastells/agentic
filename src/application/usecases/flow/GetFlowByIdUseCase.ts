import { Service, Inject } from 'typedi';
import { FlowService } from '../../services/FlowService';
import { Flow } from '../../../domain/entities/Flow';
import { FLOW_SERVICE, GET_FLOW_BY_ID_USE_CASE } from '../../../constants';
/**
 * @description Use case for retrieving a specific flow by its ID.
 */
@Service(GET_FLOW_BY_ID_USE_CASE)
export class GetFlowByIdUseCase {
  constructor(
    @Inject(FLOW_SERVICE) private flowService: FlowService
  ) {}

  /**
   * Executes the use case.
   * @param {string} id - The ID of the flow to retrieve.
   * @returns {Promise<Flow | null>} A promise that resolves to the flow or null if not found.
   */
  async execute(id: string): Promise<Flow | null> {
    // Similar to GetAllFlows, authorization or specific validation logic could be added here.
    return this.flowService.getFlowById(id);
  }
}