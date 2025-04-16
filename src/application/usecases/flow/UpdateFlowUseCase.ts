import { Service, Inject } from 'typedi';
import { FlowService } from '../../services/FlowService';
import { Flow } from '../../../domain/entities/Flow';
import { UpdateFlowDto } from '../../dtos/UpdateFlowDto';
import { FLOW_SERVICE, UPDATE_FLOW_USE_CASE } from '../../../constants';
/**
 * @description Use case for updating an existing flow.
 */
@Service(UPDATE_FLOW_USE_CASE)
export class UpdateFlowUseCase {
  constructor(
    @Inject(FLOW_SERVICE) private flowService: FlowService
  ) {}

  /**
   * Executes the use case.
   * @param {string} id - The ID of the flow to update.
   * @param {UpdateFlowDto} updateFlowDto - The data transfer object containing the updates.
   * @returns {Promise<Flow | null>} A promise that resolves to the updated flow or null if not found.
   */
  async execute(id: string, updateFlowDto: UpdateFlowDto): Promise<Flow | null> {
    // Here, we could add more complex logic like:
    // - Checking if the user has permission to update this specific flow.
    // - Validating specific business rules before updating.
    // - Transforming the DTO if needed before passing it to the service.
    
    // The service layer handles the core update logic.
    // We pass the DTO directly for now, assuming the service handles partial updates.
    // Note: The original controller added `updatedAt`. This responsibility should ideally
    // be handled consistently, either in the service or repository layer (e.g., via hooks).
    // For simplicity, we'll assume the service handles it or it's managed by the DB schema.
    return this.flowService.updateFlow(id, updateFlowDto);
  }
}