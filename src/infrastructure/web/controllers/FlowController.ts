import Container, { Inject, Service } from 'typedi';
import { FlowService } from '../../../application/services/FlowService';
import { CreateFlowDto } from '../../../application/dtos/CreateFlowDto';
import { UpdateFlowDto } from '../../../application/dtos/UpdateFlowDto';
import { ExecuteFlowDto } from '../../../application/dtos/ExecuteFlowDto';
import { FLOW_SERVICE, CREATE_FLOW_USE_CASE, GET_ALL_FLOWS_USE_CASE, GET_FLOW_BY_ID_USE_CASE, UPDATE_FLOW_USE_CASE, DELETE_FLOW_USE_CASE, EXECUTE_FLOW_USE_CASE, FLOW_CONTROLLER } from '../../../constants';
import { GetFlowByIdUseCase } from '../../../application/usecases/flow/GetFlowByIdUseCase';
import { CreateFlowUseCase } from '../../../application/usecases/flow/CreateFlowUseCase';
import { GetAllFlowsUseCase } from '../../../application/usecases/flow/GetAllFlowsUseCase';
import { DeleteFlowUseCase } from '../../../application/usecases/flow/DeleteFlowUseCase';
import { ExecuteFlowUseCase } from '../../../application/usecases/flow/ExecuteFlowUseCase';
import { UpdateFlowUseCase } from '../../../application/usecases/flow/UpdateFlowUseCase';

@Service(FLOW_CONTROLLER)
export class FlowController {
  private createFlowUseCase = Container.get<CreateFlowUseCase>(CREATE_FLOW_USE_CASE);
  private getAllFlowsUseCase = Container.get<GetAllFlowsUseCase>(GET_ALL_FLOWS_USE_CASE);
  private getFlowByIdUseCase = Container.get<GetFlowByIdUseCase>(GET_FLOW_BY_ID_USE_CASE);
  private updateFlowUseCase = Container.get<UpdateFlowUseCase>(UPDATE_FLOW_USE_CASE);
  private deleteFlowUseCase = Container.get<DeleteFlowUseCase>(DELETE_FLOW_USE_CASE);
  private executeFlowUseCase = Container.get<ExecuteFlowUseCase>(EXECUTE_FLOW_USE_CASE);
  constructor(
    @Inject(FLOW_SERVICE) private flowService: FlowService,

  ) {}

  /**
   * Get all flows
   */
  public async getAll(): Promise<any[]> {
    return this.getAllFlowsUseCase.execute();
  }

  /**
   * Get a flow by ID
   */
  public async getById(id: string): Promise<any> {
    const flow = await this.getFlowByIdUseCase.execute(id);
    if (!flow) {
      throw { status: 404, message: 'Flow not found' };
    }
    return flow;
  }

  /**
   * Create a new flow
   */
  public async create(
    createFlowDto: CreateFlowDto,
    userId?: string
  ): Promise<any> {
    if (!userId) {
      throw { status: 400, message: 'User ID not provided' };
    }
    return this.createFlowUseCase.execute(createFlowDto, userId);
  }

  /**
   * Update a flow
   */
  public async update(id: string, updateFlowDto: UpdateFlowDto): Promise<any> {
    const updatedFlow = await this.updateFlowUseCase.execute(id, updateFlowDto);
    if (!updatedFlow) {
      throw { status: 404, message: 'Flow not found' };
    }
    return updatedFlow;
  }

  /**
   * Delete a flow
   */
  public async delete(id: string): Promise<void> {
    const success = await this.deleteFlowUseCase.execute(id);
    if (!success) {
      throw { status: 404, message: 'Flow not found or could not be deleted' };
    }
    // No return needed for 204
  }

  /**
   * Execute a flow
   */
  public async execute(id: string, executeFlowDto: ExecuteFlowDto): Promise<any> {
    const result = await this.executeFlowUseCase.execute(id, executeFlowDto);
    if (result && result.success === false) {
      throw { status: 500, message: result.error || 'Failed to execute flow' };
    }
    return result;
  }
}