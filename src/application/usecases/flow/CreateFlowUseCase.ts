import { Service, Inject } from 'typedi';
import { FlowService } from '../../services/FlowService'; // Adjust path if necessary
import { CreateFlowDto } from '../../dtos/CreateFlowDto';
import { Flow } from '../../../domain/entities/Flow'; // Assuming Flow entity path
import { CREATE_FLOW_USE_CASE, FLOW_SERVICE } from '../../../constants';
@Service(CREATE_FLOW_USE_CASE)
export class CreateFlowUseCase {
  constructor(@Inject(FLOW_SERVICE) private flowService: FlowService) {}

  async execute(data: CreateFlowDto, userId: string): Promise<Flow> {
    const flowData = {
      ...data,
      userId,
      version: '1.0.0',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Assuming flowService.createFlow expects this structure and returns the created Flow
    const createdFlow = await this.flowService.createFlow(flowData); 
    
    return createdFlow;
  }
} 