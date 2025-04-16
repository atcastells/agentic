import { Service, Inject } from 'typedi';
import { FlowService } from '../../services/FlowService';
import { Flow } from '../../../domain/entities/Flow';
import { FLOW_SERVICE, GET_ALL_FLOWS_USE_CASE } from '../../../constants';  
/**
 * @description Use case for retrieving all flows.
 */
@Service(GET_ALL_FLOWS_USE_CASE)
export class GetAllFlowsUseCase {
  constructor(
    @Inject(FLOW_SERVICE) private flowService: FlowService
  ) {}

  /**
   * Executes the use case.
   * @returns {Promise<Flow[]>} A promise that resolves to an array of flows.
   */
  async execute(): Promise<Flow[]> {
    // In a more complex scenario, this use case could add authorization checks,
    // specific filtering logic not suitable for the service layer, etc.
    return this.flowService.getAllFlows();
  }
}