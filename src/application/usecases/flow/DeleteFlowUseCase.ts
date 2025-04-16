import { Service, Inject } from 'typedi';
import { FlowService } from '../../services/FlowService';
import { FLOW_SERVICE, DELETE_FLOW_USE_CASE } from '../../../constants';
/**
 * @description Use case for deleting a specific flow by its ID.
 */
@Service(DELETE_FLOW_USE_CASE)
export class DeleteFlowUseCase {
  constructor(
    @Inject(FLOW_SERVICE) private flowService: FlowService
  ) {}

  /**
   * Executes the use case.
   * @param {string} id - The ID of the flow to delete.
   * @returns {Promise<boolean>} A promise that resolves to true if deletion was successful, false otherwise.
   */
  async execute(id: string): Promise<boolean> {
    // Add authorization checks here if needed (e.g., can the current user delete this flow?)
    return this.flowService.deleteFlow(id);
  }
}