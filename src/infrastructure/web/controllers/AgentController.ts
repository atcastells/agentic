import Container, { Inject, Service } from 'typedi';
import { CreateAgentDto } from '../../../application/dtos/CreateAgentDto';
import { ExecuteAgentDto } from '../../../application/dtos/ExecuteAgentDto';
import { UpdateAgentDto } from '../../../application/dtos/UpdateAgentDto';
import { AgentService } from '../../../application/services/AgentService';
import { CreateAgentUseCase } from '../../../application/usecases/agent/CreateAgentUseCase';
import { DeleteAgentUseCase } from '../../../application/usecases/agent/DeleteAgentUseCase';
import { ExecuteAgentUseCase } from '../../../application/usecases/agent/ExecuteAgentUseCase';
import { GetAgentByIdUseCase } from '../../../application/usecases/agent/GetAgentByIdUseCase';
import { GetAllAgentsUseCase } from '../../../application/usecases/agent/GetAllAgentsUseCase';
import { UpdateAgentUseCase } from '../../../application/usecases/agent/UpdateAgentUseCase';
import { AGENT_CONTROLLER, AGENT_SERVICE, CREATE_AGENT_USE_CASE, DELETE_AGENT_USE_CASE, EXECUTE_AGENT_USE_CASE, GET_AGENT_BY_ID_USE_CASE, GET_ALL_AGENTS_USE_CASE, UPDATE_AGENT_USE_CASE } from '../../../constants';

@Service(AGENT_CONTROLLER)
export class AgentController {
  private createAgentUseCase = Container.get<CreateAgentUseCase>(CREATE_AGENT_USE_CASE);
  private getAllAgentsUseCase = Container.get<GetAllAgentsUseCase>(GET_ALL_AGENTS_USE_CASE);
  private getAgentByIdUseCase = Container.get<GetAgentByIdUseCase>(GET_AGENT_BY_ID_USE_CASE);
  private updateAgentUseCase = Container.get<UpdateAgentUseCase>(UPDATE_AGENT_USE_CASE);
  private deleteAgentUseCase = Container.get<DeleteAgentUseCase>(DELETE_AGENT_USE_CASE);
  private executeAgentUseCase = Container.get<ExecuteAgentUseCase>(EXECUTE_AGENT_USE_CASE);
  constructor(
    @Inject(AGENT_SERVICE) private agentService: AgentService,

  ) {}

  /**
   * Get all agents
   */
  public async getAll(): Promise<any[]> {
    return this.getAllAgentsUseCase.execute();
  }

  /**
   * Get a agent by ID
   */
  public async getById(id: string): Promise<any> {
    const agent = await this.getAgentByIdUseCase.execute(id);
    if (!agent) {
      throw { status: 404, message: 'Agent not found' };
    }
    return agent;
  }

  /**
   * Create a new agent
   */
  public async create(
    createAgentDto: CreateAgentDto,
    userId?: string
  ): Promise<any> {
    if (!userId) {
      throw { status: 400, message: 'User ID not provided' };
    }
    return this.createAgentUseCase.execute(createAgentDto, userId);
  }

  /**
   * Update a agent
   */
  public async update(id: string, updateAgentDto: UpdateAgentDto): Promise<any> {
    const updatedAgent = await this.updateAgentUseCase.execute(id, updateAgentDto);
    if (!updatedAgent) {
      throw { status: 404, message: 'Agent not found' };
    }
    return updatedAgent;
  }

  /**
   * Delete a agent
   */
  public async delete(id: string): Promise<void> {
    const success = await this.deleteAgentUseCase.execute(id);
    if (!success) {
      throw { status: 404, message: 'Agent not found or could not be deleted' };
    }
    // No return needed for 204
  }

  /**
   * Execute a agent
   */
  public async execute(id: string, executeAgentDto: ExecuteAgentDto): Promise<any> {
    const result = await this.executeAgentUseCase.execute(id, executeAgentDto);
    if (result && result.success === false) {
      throw { status: 500, message: result.error || 'Failed to execute agent' };
    }
    return result;
  }
}