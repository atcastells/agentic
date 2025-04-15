import { Service } from 'typedi';
import { FlowService } from '../../services/FlowService'; // Adjust path if necessary
import { CreateFlowDto } from '../../dtos/CreateFlowDto';
import { Flow } from '../../../domain/entities/Flow'; // Assuming Flow entity path

@Service()
export class CreateFlowUseCase {
  constructor(private flowService: FlowService) {}

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